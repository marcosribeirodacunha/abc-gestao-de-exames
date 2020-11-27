import React, { useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

import { FormHandles, SubmitHandler } from '@unform/core';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Form } from './styles';

interface FormData {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('A senha é obrigatória'),
          login: Yup.string()
            .test(
              'is-email-or-regist-number',
              'E-mail ou matrícula inválidos',
              value => {
                if (!value) return false;

                const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (emailRegex.test(value)) return true;

                const registNumberRegex = /^[0-9]{8}$/;
                if (registNumberRegex.test(value)) return true;

                return false;
              }
            )
            .required('E-mail ou matrícula são obrigatórios'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn(data);
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
        }
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Bem-vindo</h1>

        <Input label="E-mail ou matrícula" name="login" />
        <Input type="password" label="Senha" name="password" />

        <Button type="submit" variant="primary" block>
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
