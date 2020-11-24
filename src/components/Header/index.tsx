import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import useAuth from '../../hooks/useAuth';
import { Container, Content, Dropdown } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [openedDropdown, setOpenedDropdown] = useState('');

  useEffect(() => {
    setOpenedDropdown('');
  }, [location]);

  function handleOpenDropdown(id: string) {
    if (openedDropdown === id) setOpenedDropdown('');
    else setOpenedDropdown(id);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="ABC" />

        <nav>
          <NavLink exact to="/">
            Início
          </NavLink>
          <NavLink to="/exames">Exames</NavLink>
          <Dropdown isOpen={openedDropdown === 'employeeDropdown'}>
            <button
              type="button"
              onClick={() => handleOpenDropdown('employeeDropdown')}
              onFocus={() => handleOpenDropdown('employeeDropdown')}
            >
              Funcionários
            </button>
            <div>
              <NavLink to="/funcionarios" exact>
                Registrados
              </NavLink>
              <NavLink to="/funcionarios/inserir">Inserir</NavLink>
            </div>
          </Dropdown>
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
