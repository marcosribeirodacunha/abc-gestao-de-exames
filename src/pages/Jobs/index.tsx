/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdCheck, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

import Button from '../../components/Button';
import FabButton from '../../components/FabButton';
import Input from '../../components/Input';
import Job from '../../interfaces/job';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, JobsTable, CreateForm } from './styles';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobToDelete, setJobToDelete] = useState(-1);

  const createFormRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('jobs');
        setJobs(data);
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
        else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
      }
    }

    loadData();
  }, []);

  const handleCreate: SubmitHandler<{ name: string }> = useCallback(
    async (data, { reset }) => {
      try {
        createFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, 'Deve possuir ao menos 3 caracteres')
            .required('Campo obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const { data: newJob } = await api.post('jobs', data);
        setJobs([newJob, ...jobs]);
        reset();

        toast('Função criada com successo');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErrors(error);
          createFormRef.current?.setErrors(err);
        } else if (error.response) {
          toast.error(error.response.data.message);
        } else
          toast.error(
            'Um erro inexperado ocorreu. Por favor, tente mais tarde!'
          );
      }
    },
    [jobs]
  );

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`jobs/${id}`);
      setJobs(state => state.filter(job => job.id !== id));
      setJobToDelete(-1);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  };

  if (!jobs) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Funções</h1>

      <Content>
        <JobsTable>
          <header>
            <strong>Nome</strong>
          </header>
          <main>
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className={jobToDelete === index ? 'deleting' : ''}
              >
                <p>{job.name}</p>
                <span>
                  {jobToDelete === index ? (
                    <>
                      <FabButton
                        icon={MdClose}
                        variant="danger"
                        onClick={() => setJobToDelete(-1)}
                      />
                      <FabButton
                        icon={MdCheck}
                        variant="success"
                        onClick={() => handleDelete(job.id)}
                      />
                    </>
                  ) : (
                    <>
                      <FabButton icon={BiPencil} />
                      <FabButton
                        icon={BiTrash}
                        variant="danger"
                        onClick={() => setJobToDelete(index)}
                      />
                    </>
                  )}
                </span>
              </div>
            ))}
          </main>
        </JobsTable>

        <CreateForm ref={createFormRef} onSubmit={handleCreate}>
          <p>Cadastre uma nova função</p>

          <Input label="Nome" name="name" />
          <Button type="submit" variant="primary" block>
            Cadastrar
          </Button>
        </CreateForm>
      </Content>
    </Container>
  );
};

export default Jobs;
