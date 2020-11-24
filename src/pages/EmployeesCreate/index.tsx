import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import ImageInput from '../../components/ImageInput';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Job from '../../interfaces/job';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';

interface FormData {
  [key: string]: any;
  name: string;
  photo: File;
  cpf: string;
  email: string;
  phone: string;
  jobId: string;
  registrationNumber: string;
}

const EmployeesCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const { data } = await api.get('jobs');
      setJobs(data);
    }

    loadJobs();
  }, []);

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current?.setErrors({});

        Yup.setLocale({
          mixed: {
            required: 'Campo obrigatório',
          },
          string: {
            min: 'Deve possuir ao menos ${min} caracteres',
            email: 'Deve ser um email válido',
          },
        });

        const schema = Yup.object().shape({
          name: Yup.string().min(3).required(),
          photo: Yup.mixed().required(),
          cpf: Yup.string()
            .test('length', 'Deve ser um CPF válido', value => {
              if (!value) return false;
              return value.length === 11;
            })
            .required(),
          email: Yup.string().email().required(),
          phone: Yup.string()
            .test('phone', 'Deve ser um telefone válido', value => {
              if (!value) return false;
              return value.length >= 10 && value.length <= 12;
            })
            .required(),
          jobId: Yup.string().required(),
          registrationNumber: Yup.string()
            .test('regist_number', 'Deve possuir 8 numeros', value => {
              if (!value) return false;
              return value.length === 8;
            })
            .required(),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        await api.post('users', formData);
        toast('Funcionário registrado com successo');

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

  return (
    <Container>
      <h1>Registrar funcionário</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <ImageInput name="photo" />
        <Input label="Nome" name="name" />
        <Input label="CPF" name="cpf" />
        <Input label="E-mail" name="email" />
        <Input label="Telefone" name="phone" />
        <Select
          label="Função"
          name="jobId"
          options={jobs.map(job => ({
            value: job.id,
            label: job.name,
          }))}
        />
        <Input label="Matrícula" name="registrationNumber" />

        <Button type="submit" variant="primary" block>
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeesCreate;
