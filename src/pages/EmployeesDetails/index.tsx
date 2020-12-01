/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import ImageInput from '../../components/ImageInput';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import Employee from '../../interfaces/employee';
import Job from '../../interfaces/job';
import api from '../../services/api';
import getObjectDifference from '../../utils/getObjectDifference';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, DeleteEmployee } from './styles';

interface FormData {
  [key: string]: any;
  name: string;
  photo?: File;
  cpf: string;
  email: string;
  phone: string;
  jobId: string;
  registrationNumber: string;
}

type Params = { id: string };

const EmployeesDetails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const params = useParams() as Params;

  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetchingUpdate, setIsFetchingUpdate] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: jobsData } = await api.get('jobs');
        const { data: employeeData } = await api.get(`users/${params.id}`);

        setJobs(jobsData);
        setEmployee(employeeData);
        setIsLoading(false);

        formRef.current?.setData({
          ...employeeData,
          jobId: {
            value: employeeData.job.id,
            label: employeeData.job.name,
          },
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
  }, [params.id]);

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        setIsFetchingUpdate(true);
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

        if (!data.photo) delete data.photo;

        const updateData = getObjectDifference(data, employee);

        const formData = new FormData();
        Object.keys(updateData).forEach(key =>
          formData.append(key, updateData[key])
        );

        await api.patch(`users/${employee.id}`, formData);

        const jobIndex = jobs.findIndex(item => item.id === data.jobId);
        setEmployee({ ...employee, job: jobs[jobIndex] });
        setIsUpdating(false);
        setIsFetchingUpdate(false);

        toast('Dados atualizados com successo');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
        }
        setIsFetchingUpdate(false);
      }
    },
    [employee, jobs]
  );

  const handleCancelUpdate = useCallback(() => {
    formRef.current?.setData({
      ...employee,
      jobId: {
        value: employee.job.id,
        label: employee.job.name,
      },
    });

    setIsUpdating(false);
  }, [employee]);

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`users/${employee.id}`);

      setIsDeleting(false);
      setIsDeleted(true);
      toast('Funcionário excluido com sucesso');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  }, [employee]);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ImageInput name="photo" disabled={!isUpdating || isFetchingUpdate} />
        <Input
          label="Nome"
          name="name"
          disabled={!isUpdating || isFetchingUpdate}
        />
        <Input
          label="CPF"
          name="cpf"
          disabled={!isUpdating || isFetchingUpdate}
        />
        <Input
          label="E-mail"
          name="email"
          disabled={!isUpdating || isFetchingUpdate}
        />
        <Input
          label="Telefone"
          name="phone"
          disabled={!isUpdating || isFetchingUpdate}
        />
        <Select
          label="Função"
          name="jobId"
          options={jobs.map(job => ({
            value: job.id,
            label: job.name,
          }))}
          isDisabled={!isUpdating || isFetchingUpdate}
        />
        <Input
          label="Matrícula"
          name="registrationNumber"
          disabled={!isUpdating || isFetchingUpdate}
        />

        {!isDeleted &&
          (isUpdating ? (
            <div className="button-row">
              <Button
                variant="light"
                onClick={handleCancelUpdate}
                isLoading={isFetchingUpdate}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isFetchingUpdate}
              >
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

      {!isDeleted && (
        <DeleteEmployee>
          <h2>Atenção</h2>
          <p>
            Ao confirmar a exclusão deste <strong>funcionário</strong>, este não
            estará mais disponível e não será possivel reverter esta ação.
            Também serão excluídos todos os <strong>exames</strong> relacionados
            com este funcionário de forma <strong>permanente</strong>.
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
            <Button variant="danger" block onClick={() => setIsDeleting(true)}>
              Excluir registro
            </Button>
          )}
        </DeleteEmployee>
      )}
    </Container>
  );
};

export default EmployeesDetails;
