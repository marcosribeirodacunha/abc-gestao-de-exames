import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div<{ hasError: boolean }>`
  position: absolute;
  top: -96px;
  left: 50%;
  transform: translateX(-50%);

  > input {
    display: none;
  }

  > div {
    ${card}
    padding: 4px;
    border: 2px solid;
    border-color: ${props =>
      props.hasError ? props.theme.colors.error : 'transparent'};
    width: 192px;
    height: 192px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: ${props => props.theme.radius};
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 48px;
    height: 48px;
    background: ${props => props.theme.colors.secondary};
    border-radius: ${props => props.theme.radius};
    cursor: pointer;
    transition: 0.2s;

    position: absolute;
    right: -12px;
    bottom: -12px;

    &:hover {
      background: ${props => props.theme.colors.secondary_hover};
    }
  }
`;
