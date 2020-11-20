import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Form } from './styles';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Form ref={formRef} onSubmit={data => console.log(data)}>
        <h1>Bem-vindo</h1>

        <Input label="E-mail ou matrícula" name="login" />
        <Input label="Senha" name="password" />

        <Button variant="primary" block>
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
