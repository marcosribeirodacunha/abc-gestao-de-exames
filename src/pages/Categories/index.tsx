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
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, CategoriesTable, CreateForm } from './styles';

interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryToDelete, setCategoryToDelete] = useState(-1);

  const createFormRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('categories');
        setCategories(data);
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

        const { data: newCategory } = await api.post('categories', data);
        setCategories([newCategory, ...categories]);
        reset();

        toast('Categoria criada com successo');
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
    [categories]
  );

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`categories/${id}`);
      setCategories(state => state.filter(job => job.id !== id));
      setCategoryToDelete(-1);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else
        toast.error('Um erro inexperado ocorreu. Por favor, tente mais tarde!');
    }
  };

  if (!categories) return <h1>Loading...</h1>;

  return (
    <Container>
      <h1>Categorias</h1>

      <Content>
        <CategoriesTable>
          <header>
            <strong>Nome</strong>
          </header>
          <main>
            {categories.map((job, index) => (
              <div
                key={job.id}
                className={categoryToDelete === index ? 'deleting' : ''}
              >
                <p>{job.name}</p>
                <span>
                  {categoryToDelete === index ? (
                    <>
                      <FabButton
                        icon={MdClose}
                        variant="danger"
                        onClick={() => setCategoryToDelete(-1)}
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
                        onClick={() => setCategoryToDelete(index)}
                      />
                    </>
                  )}
                </span>
              </div>
            ))}
          </main>
        </CategoriesTable>

        <CreateForm ref={createFormRef} onSubmit={handleCreate}>
          <p>Cadastre uma nova categoria</p>

          <Input label="Nome" name="name" />
          <Button type="submit" variant="primary" block>
            Cadastrar
          </Button>
        </CreateForm>
      </Content>
    </Container>
  );
};

export default Categories;