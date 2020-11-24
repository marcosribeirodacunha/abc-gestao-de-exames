import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { debounce } from 'lodash';

import Input from '../../components/Input';
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
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const { data } = await api.get('jobs');
      setJobs(data);
    }

    async function loadEmployees() {
      const { data } = await api.get('users');
      setEmployees(data);
    }

    loadJobs();
    loadEmployees();
  }, []);

  const handleSubmitFilter: SubmitHandler<FilterData> = useCallback(
    async data => {
      try {
        console.log(data);
        const response = await api.get('users', { params: data });
        setEmployees(response.data);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
        else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
      }
    },
    []
  );

  if (!jobs || !employees) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Funcionários cadastrados</h1>

      <Filters>
        <p>
          Para realizar a filtragem dos dados preencha um ou mais campos abaixo.
        </p>

        <Form ref={formRef} onSubmit={handleSubmitFilter}>
          <Input
            label="Funcionário"
            name="name"
            variant="white"
            onKeyUp={debounce(() => formRef.current?.submitForm(), 1000)}
          />
          <Input
            label="Matrícula"
            name="regist_number"
            variant="white"
            onKeyUp={debounce(() => formRef.current?.submitForm(), 1000)}
          />
          <Select
            label="Função"
            name="job_id"
            options={jobs.map(job => ({
              value: job.id,
              label: job.name,
            }))}
            variant="white"
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
          {employees.map(employee => (
            <div key={employee.id}>
              <p>{employee.name}</p>
              <p>{employee.cpf}</p>
              <p>{employee.registrationNumber}</p>
              <p>{employee.job.name}</p>
              <p>{employee.email}</p>
              <MdChevronRight size="24" />
            </div>
          ))}
        </main>
      </EmployeesTable>
    </Container>
  );
};

export default EmployeesList;
