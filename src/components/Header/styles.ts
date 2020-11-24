import styled, { css } from 'styled-components';

import { card } from '../../styles/shared';

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

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: relative;

  > div {
    ${card}
    position: absolute;
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    padding: 0.5rem;

    display: flex;
    flex-direction: column;
    transition: 0.3s;
    z-index: -1000;

    ${props =>
      props.isOpen &&
      css`
        transform: translateX(-50%) translateY(0);
        opacity: 1;
        z-index: 1000;
      `}

    &::before {
      content: '';
      position: absolute;
      top: -7px;
      left: 50%;
      transform: translateX(-50%) rotate(135deg);
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background-color: ${props => props.theme.colors.white};
      pointer-events: none;
    }

    a {
      padding: 10px 20px;
      border-radius: ${props => props.theme.radius};

      & + a {
        margin-top: 0.5rem;
      }

      &:hover,
      &:focus {
        color: inherit;
        background: ${props => props.theme.colors.light};
      }

      &.active::after {
        top: 2px;
        left: 2px;
        width: 4px;
        height: calc(100% - 4px);
        border-radius: 4px;
        background-color: ${props => props.theme.colors.secondary};
      }
    }
  }
`;
