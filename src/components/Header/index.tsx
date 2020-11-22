import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import useAuth from '../../hooks/useAuth';
import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <img src={logo} alt="ABC" />

        <nav>
          <NavLink exact to="/">
            Início
          </NavLink>
          <NavLink to="/exames">Exames</NavLink>
          <NavLink to="/funcionarios">Funcionários</NavLink>
          <NavLink to="/funcoes">Funções</NavLink>
          <NavLink to="/tipos-de-exames">Tipos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </nav>
      </Content>
    </Container>
  );
};

export default Header;
