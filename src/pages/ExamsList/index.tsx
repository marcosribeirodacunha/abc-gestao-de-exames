import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import { debounce } from 'lodash';

import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Category from '../../interfaces/category';
import Exam from '../../interfaces/exam';
import ExamType from '../../interfaces/examType';
import Job from '../../interfaces/job';
import api from '../../services/api';
import { Container, Filters, ExamsTable, Badge } from './styles';

interface FilterData {
  employee: string;
  regist_number: string;
  job_id: string;
}

const ExamsList: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: jobsData } = await api.get('jobs');
        const { data: categoriesData } = await api.get('categories');
        const { data: examTypesData } = await api.get('exam-types');
        const { data: examsData } = await api.get('exams');

        setJobs(jobsData);
        setCategories(categoriesData);
        setExamTypes(examTypesData);
        setExams(examsData);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
      }
    }

    loadData();
  }, []);

  const handleSubmit: SubmitHandler<FilterData> = useCallback(async data => {
    try {
      console.log(data);
      const response = await api.get('exams', { params: data });
      setExams(response.data);
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  }, []);

  function submitForm() {
    formRef.current?.submitForm();
  }

  if (!jobs || !categories || !examTypes || !exams) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Exames realizadoss</h1>

      <Filters>
        <p>
          Para realizar a filtragem dos dados preencha um ou mais campos abaixo.
        </p>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="row-top">
            <Input
              label="Funcionário"
              name="employee"
              variant="white"
              onKeyUp={debounce(submitForm, 1000)}
            />
            <Input
              label="Matrícula"
              name="regist_number"
              variant="white"
              onKeyUp={debounce(submitForm, 1000)}
            />
            <Select
              label="Função"
              name="job_id"
              options={jobs.map(job => ({
                value: job.id,
                label: job.name,
              }))}
              variant="white"
              onChange={debounce(submitForm, 1)}
            />
          </div>
          <div className="row-bottom">
            <Select
              label="Tipo de exame"
              name="exam_type_id"
              variant="white"
              options={examTypes.map(examType => ({
                value: examType.id,
                label: examType.name,
              }))}
              onChange={debounce(submitForm, 1)}
            />
            <Select
              label="Categoria"
              name="category_id"
              variant="white"
              options={categories.map(category => ({
                value: category.id,
                label: category.name,
              }))}
              onChange={debounce(submitForm, 1)}
            />
            <div className="due-date">
              <DatePicker
                label="Validade entre"
                name="due_start"
                variant="white"
                handleChange={debounce(submitForm, 1)}
              />
              <DatePicker
                label="&nbsp;"
                name="due_end"
                variant="white"
                handleChange={debounce(submitForm, 1)}
              />
            </div>
          </div>
        </Form>
      </Filters>

      <ExamsTable>
        <header>
          <strong>Funcionário</strong>
          <strong>Função</strong>
          <strong>Tipo de exame</strong>
          <strong>Categoria</strong>
          <strong>Status</strong>
          <strong>Vencimento</strong>
        </header>
        <main>
          {exams.map(exam => (
            <div key={exam.id}>
              <p>{exam.employee.name}</p>
              <p>{exam.employee.job.name}</p>
              <p>{exam.type.name}</p>
              <p>{exam.category.name}</p>
              <p>
                <Badge className={exam.expired ? 'red' : 'green'}>
                  {exam.expired ? 'Vencido' : 'Válido'}
                </Badge>
              </p>
              <p>{format(new Date(exam.dueDate), 'dd/MM/yyyy')}</p>
              <MdChevronRight size="24" />
            </div>
          ))}
        </main>
      </ExamsTable>
    </Container>
  );
};

export default ExamsList;
