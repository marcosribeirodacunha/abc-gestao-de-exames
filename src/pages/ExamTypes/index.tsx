/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdCheck, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import FabButton from '../../components/FabButton';
import Input from '../../components/Input';
import ExamType from '../../interfaces/examType';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, ExamTypesTable, CreateForm } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Deve possuir ao menos 3 caracteres')
    .required('Campo obrigatório'),
  expiration: Yup.string()
    .test('min', 'Deve possuir ao menos 1 dia', value => {
      return Number(value) > 0;
    })
    .required('Campo obrigatório'),
});

type FormData = {
  name: string;
  expiration: number;
};

const ExamTypes: React.FC = () => {
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [examTypeToDelete, setExamTypeToDelete] = useState(-1);
  const [examTypeToUpdate, setExamTypeToUpdate] = useState(-1);

  const createFormRef = useRef<FormHandles>(null);
  const updateFormRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('exam-types');
        setExamTypes(data);
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

  const handleCreate: SubmitHandler<FormData> = useCallback(
    async (data, { reset }) => {
      try {
        createFormRef.current?.setErrors({});

        await schema.validate(data, { abortEarly: false });

        const { data: newExamType } = await api.post('exam-types', {
          name: data.name,
          expiration: Number(data.expiration),
        });
        setExamTypes([newExamType, ...examTypes]);
        reset();

        toast('Tipo de exame criada com successo');
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
    [examTypes]
  );

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`exam-types/${id}`);
      setExamTypes(state => state.filter(examType => examType.id !== id));
      setExamTypeToDelete(-1);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  };

  const handleUpdate: SubmitHandler<FormData> = async data => {
    try {
      createFormRef.current?.setErrors({});

      await schema.validate(data, { abortEarly: false });

      const examTypeId = examTypes[examTypeToUpdate].id;

      const { data: updated } = await api.patch<ExamType>(
        `exam-types/${examTypeId}`,
        {
          name: data.name,
          expiration: Number(data.expiration),
        }
      );

      const exameTypesClone = examTypes;
      exameTypesClone[examTypeToUpdate] = {
        id: updated.id,
        name: updated.name,
        expiration: updated.expiration,
      };

      setExamTypes(exameTypesClone);
      setExamTypeToUpdate(-1);

      toast('Tipo de exame atualizado com successo');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const err = getValidationErrors(error);
        createFormRef.current?.setErrors(err);
      } else if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  };

  if (!examTypes) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Tipos de Exames</h1>

      <Content>
        <ExamTypesTable>
          <header>
            <strong>Nome</strong>
            <strong>
              Validade <span>(em dias)</span>
            </strong>
          </header>
          <main>
            {examTypes.length === 0 ? (
              <p>Nenhum tipo de exame registrado no momento</p>
            ) : (
              examTypes.map((examType, index) =>
                examTypeToUpdate === index ? (
                  <Form
                    key={examType.id}
                    ref={updateFormRef}
                    onSubmit={handleUpdate}
                    initialData={examTypes[examTypeToUpdate]}
                  >
                    <Input name="name" />
                    <Input name="expiration" />
                    <span>
                      <FabButton
                        icon={MdClose}
                        variant="danger"
                        onClick={() => setExamTypeToUpdate(-1)}
                      />
                      <FabButton
                        type="submit"
                        icon={MdCheck}
                        variant="success"
                      />
                    </span>
                  </Form>
                ) : (
                  <div
                    key={examType.id}
                    className={examTypeToDelete === index ? 'deleting' : ''}
                  >
                    <p>{examType.name}</p>
                    <p>{examType.expiration}</p>
                    <span>
                      {examTypeToDelete === index ? (
                        <>
                          <FabButton
                            icon={MdClose}
                            variant="danger"
                            onClick={() => setExamTypeToDelete(-1)}
                          />
                          <FabButton
                            icon={MdCheck}
                            variant="success"
                            onClick={() => handleDelete(examType.id)}
                          />
                        </>
                      ) : (
                        <>
                          <FabButton
                            icon={BiPencil}
                            onClick={() => setExamTypeToUpdate(index)}
                          />
                          <FabButton
                            icon={BiTrash}
                            variant="danger"
                            onClick={() => setExamTypeToDelete(index)}
                          />
                        </>
                      )}
                    </span>
                  </div>
                )
              )
            )}
          </main>
        </ExamTypesTable>

        <CreateForm ref={createFormRef} onSubmit={handleCreate}>
          <p>Cadastre um novo tipo de exame</p>

          <Input label="Nome" name="name" />
          <Input
            label="Validade"
            tip="em dias"
            name="expiration"
            type="number"
            min="1"
          />
          <Button type="submit" variant="primary" block>
            Cadastrar
          </Button>
        </CreateForm>
      </Content>
    </Container>
  );
};

export default ExamTypes;
