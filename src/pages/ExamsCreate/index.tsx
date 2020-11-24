import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import Select from '../../components/Select';
import Category from '../../interfaces/category';
import Employee from '../../interfaces/employee';
import ExamType from '../../interfaces/examType';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';

interface FormData {
  employee: string;
  type: File;
  category: string;
  date: Date;
}

const ExamsCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: employeesData } = await api.get('users');
        const { data: categoriesData } = await api.get('categories');
        const { data: examTypesData } = await api.get('exam-types');

        setEmployees(employeesData);
        setCategories(categoriesData);
        setExamTypes(examTypesData);
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

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        Yup.setLocale({
          mixed: {
            required: 'Campo obrigatório',
          },
        });

        const schema = Yup.object().shape({
          employee: Yup.string().required(),
          type: Yup.string().required(),
          category: Yup.string().required(),
          date: Yup.mixed().nullable(),
        });

        await schema.validate(data, { abortEarly: false });

        if (data.date === null) data.date = new Date();

        await api.post('exams', data);
        toast('Exame registrado com sucesso');

        reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
          console.log(error);
        }
      }
    },
    []
  );

  if (!employees || !categories || !examTypes) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Registrar realização de exame</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select
          label="Funcionário"
          name="employee"
          options={employees.map(employee => ({
            value: employee.id,
            label: employee.name,
          }))}
        />
        <Select
          label="Tipo de exame"
          name="type"
          options={examTypes.map(examType => ({
            value: examType.id,
            label: examType.name,
          }))}
        />
        <Select
          label="Categoria"
          name="category"
          options={categories.map(category => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <DatePicker label="Data de realização" name="date" />
        <p>
          Obs.: Se a data não for informada, será registrado o nomento do
          cadastro
        </p>

        <Button type="submit" variant="primary" block>
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default ExamsCreate;
