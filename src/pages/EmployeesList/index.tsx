/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { debounce } from 'lodash';

import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import Employee from '../../interfaces/employee';
import Job from '../../interfaces/job';
import api from '../../services/api';
import { Container, Filters, EmployeesTable } from './styles';

interface FilterData {
  name: string;
  regist_number: string;
  job_id: string;
}

const EmployeesList: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: jobsData } = await api.get('jobs');
        const { data: usersData } = await api.get('users');

        setJobs(jobsData);
        setEmployees(usersData);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  const handleSubmit: SubmitHandler<FilterData> = useCallback(async data => {
    try {
      const response = await api.get('users', { params: data });
      setEmployees(response.data);
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  }, []);

  function submitForm() {
    formRef.current?.submitForm();
  }

  function handleNavigateToDetails(id: string) {
    history.push(`funcionarios/${id}`);
  }

  if (isLoading) return <Loader />;

  return (
    <Container>
      <h1>Funcionários cadastrados</h1>

      <Filters>
        <p>
          Para realizar a filtragem dos dados preencha um ou mais campos abaixo.
        </p>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Funcionário"
            name="name"
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
        </Form>
      </Filters>

      <EmployeesTable>
        <header>
          <strong>Nome</strong>
          <strong>CPF</strong>
          <strong>Matrícula</strong>
          <strong>Função</strong>
          <strong>E-mail</strong>
        </header>
        <main>
          {employees.length === 0 ? (
            <p>Nenhum empregado registrado no nomento</p>
          ) : (
            employees.map(employee => (
              <div
                key={employee.id}
                onClick={() => handleNavigateToDetails(employee.id)}
              >
                <p>{employee.name}</p>
                <p>{employee.cpf}</p>
                <p>{employee.registrationNumber}</p>
                <p>{employee.job.name}</p>
                <p>{employee.email}</p>
                <MdChevronRight size="24" />
              </div>
            ))
          )}
        </main>
      </EmployeesTable>
    </Container>
  );
};

export default EmployeesList;
