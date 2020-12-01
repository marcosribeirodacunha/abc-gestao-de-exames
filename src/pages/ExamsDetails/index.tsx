import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { addDays, isAfter } from 'date-fns';
import { debounce } from 'lodash';
import * as Yup from 'yup';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import ImageInput from '../../components/ImageInput';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import Category from '../../interfaces/category';
import Exam from '../../interfaces/exam';
import ExamType from '../../interfaces/examType';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, EmployeeDataForm, ExamData, DeleteExam } from './styles';

interface ExamFormData {
  type: string;
  category: string;
  date: Date | string;
}

type Params = { id: string };

const ExamsDetails: React.FC = () => {
  const employeeFormRef = useRef<FormHandles>(null);
  const examFormRef = useRef<FormHandles>(null);
  const params = useParams() as Params;

  const [isLoading, setIsLoading] = useState(true);
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [exam, setExam] = useState<Exam>({} as Exam);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: categoriesData } = await api.get('categories');
        const { data: examTypesData } = await api.get('exam-types');
        const { data: examData } = await api.get(`exams/${params.id}`);

        setCategories(categoriesData);
        setExamTypes(examTypesData);
        setExam(examData);
        setIsLoading(false);

        employeeFormRef.current?.setData({
          ...examData.employee,
          jobId: examData.employee.job.name,
        });

        examFormRef.current?.setData({
          type: { value: examData.type.id, label: examData.type.name },
          expiration: examData.type.expiration,
          category: {
            value: examData.category.id,
            label: examData.category.name,
          },
          date: new Date(examData.date),
          dueDate: new Date(examData.dueDate),
        });
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
        setIsLoading(false);
      }
    }

    loadData();
  }, [params]);

  const handleUpdateExamData: SubmitHandler<ExamFormData> = useCallback(
    async data => {
      try {
        examFormRef.current?.setErrors({});

        Yup.setLocale({
          mixed: {
            required: 'Campo obrigatório',
          },
        });

        const schema = Yup.object().shape({
          type: Yup.string().required(),
          category: Yup.string().required(),
          date: Yup.mixed()
            .test(
              'is-before-today',
              'Deve ser anterior ao dia de hoje',
              value => {
                if (value === null) return false;
                if (isAfter(value, new Date())) return false;
                return true;
              }
            )
            .required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch<ExamFormData>(`exams/${exam.id}`, {
          type: data.type,
          category: data.category,
          date: data.date,
        });

        const typeIndex = examTypes.findIndex(item => {
          return item.id === data.type;
        });

        const categoryIndex = categories.findIndex(item => {
          return item.id === data.category;
        });

        setExam({
          ...exam,
          type: examTypes[typeIndex],
          category: categories[categoryIndex],
          date: exam.date,
        });
        setIsUpdating(false);

        toast('Exame atualizado com sucesso');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          examFormRef.current?.setErrors(errors);
        } else if (error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
        }
      }
    },
    [categories, exam, examTypes]
  );

  const handleCancelUpdate = useCallback(() => {
    examFormRef.current?.setData({
      type: { value: exam.type.id, label: exam.type.name },
      expiration: exam.type.expiration,
      category: {
        value: exam.category.id,
        label: exam.category.name,
      },
      date: new Date(exam.date),
      dueDate: new Date(exam.dueDate),
    });

    setIsUpdating(false);
  }, [exam]);

  function updateDueDate(date: Date, expiration: number) {
    const newDueDate = addDays(date, expiration);
    examFormRef.current?.getFieldRef('dueDate').setSelected(newDueDate);
  }

  function handleSelectUpdateDependents(selected: any) {
    const { value } = selected as { value: string };

    const index = examTypes.findIndex(item => {
      return item.id === value;
    });

    const newExpiration = examTypes[index].expiration;
    const doneInDate = examFormRef.current?.getFieldValue('date');

    examFormRef.current?.setFieldValue('expiration', newExpiration);
    updateDueDate(doneInDate, newExpiration);
  }

  function handleDateUpdateDependents(selected: Date) {
    const expiration = examFormRef.current?.getFieldValue('expiration');
    updateDueDate(selected, expiration);
  }

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`exams/${exam.id}`);

      setIsDeleting(false);
      setIsDeleted(true);
      toast('Exame excluido com sucesso');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  }, [exam]);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <EmployeeDataForm
        ref={employeeFormRef}
        onSubmit={() => employeeFormRef.current?.getData()}
      >
        <ImageInput name="photo" disabled />
        <Input label="Nome" name="name" disabled />
        <Input label="CPF" name="cpf" disabled />
        <Input label="E-mail" name="email" disabled />
        <Input label="Telefone" name="phone" disabled />
        <Input label="Função" name="jobId" disabled />
        <Input label="Matrícula" name="registrationNumber" disabled />
      </EmployeeDataForm>

      <div>
        <ExamData>
          <h1>Informações do exame</h1>

          <Form ref={examFormRef} onSubmit={handleUpdateExamData}>
            <Select
              label="Tipo de exame"
              name="type"
              options={examTypes.map(examType => ({
                value: examType.id,
                label: examType.name,
              }))}
              onChange={debounce(handleSelectUpdateDependents, 1)}
              isDisabled={!isUpdating}
              isClearable={false}
            />

            <Input label="Validade" tip="em dias" name="expiration" disabled />

            <Select
              label="Categoria"
              name="category"
              options={categories.map(category => ({
                value: category.id,
                label: category.name,
              }))}
              isDisabled={!isUpdating}
              isClearable={false}
            />

            <DatePicker
              label="Data de realização"
              name="date"
              disabled={!isUpdating}
              maxDate={new Date()}
              isClearable={false}
              handleChange={debounce(handleDateUpdateDependents, 1)}
            />

            <DatePicker
              label="Data de vencimento"
              name="dueDate"
              isClearable={false}
              disabled
            />

            {!isDeleted &&
              (isUpdating ? (
                <div className="button-row">
                  <Button variant="light" onClick={handleCancelUpdate}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary">
                    Salvar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  block
                  onClick={() => setIsUpdating(true)}
                >
                  Editar
                </Button>
              ))}
          </Form>
        </ExamData>

        {!isDeleted && (
          <DeleteExam>
            <h2>Atenção</h2>
            <p>
              Ao confirmar a exclusão do <strong>exame</strong> este não estará
              mais disponível e não será possivel reverter esta ação.
            </p>

            {isDeleting ? (
              <div className="button-row">
                <Button variant="light" onClick={() => setIsDeleting(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                  Excluir
                </Button>
              </div>
            ) : (
              <Button
                variant="danger"
                block
                onClick={() => setIsDeleting(true)}
              >
                Excluir registro
              </Button>
            )}
          </DeleteExam>
        )}
      </div>
    </Container>
  );
};

export default ExamsDetails;
