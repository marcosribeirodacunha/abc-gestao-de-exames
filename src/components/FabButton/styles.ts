import styled from 'styled-components';

export const Container = styled.button`
  border: none;
  width: 28px;
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.radius};
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;

  & + button {
    margin-left: 8px;
  }

  &.primary {
    color: ${props => props.theme.colors.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primary_light};
    }
  }

  &.danger {
    color: ${props => props.theme.colors.error};

    &:hover {
      background-color: ${props => props.theme.colors.error_light};
    }
  }

  &.success {
    color: ${props => props.theme.colors.success};

    &:hover {
      background-color: ${props => props.theme.colors.success_light};
    }
  }
`;
