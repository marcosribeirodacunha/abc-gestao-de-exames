import styled from 'styled-components';

export const Container = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadow};
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1152px;
  padding: 0 16px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 96px;
  }

  nav {
    display: flex;
    align-items: center;

    a,
    button {
      text-decoration: none;
      padding: 20px 28px;
      color: ${props => props.theme.colors.dark};
      position: relative;
      transition: 0.2s;

      &:hover,
      &:focus {
        color: ${props => props.theme.colors.secondary};
      }

      &.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: ${props => props.theme.colors.secondary};
      }
    }

    button {
      cursor: pointer;
      background: transparent;
      border: none;
    }
  }
`;
