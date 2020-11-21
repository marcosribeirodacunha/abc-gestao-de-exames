import React, { useCallback, useRef } from 'react';

import { FormHandles, SubmitHandler } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
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
        await signIn(data);
      } catch (error) {
        console.log(error);
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
