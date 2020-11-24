import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div<{ hasError: boolean }>`
  & + div {
    margin-top: 1rem;
  }

  label {
    display: block;
    margin-bottom: 6px;

    span {
      color: ${props => props.theme.colors.dark_disabled};
      font-size: ${props => props.theme.sizes.x_small};
    }
  }

  > div {
    position: relative;
  }

  input {
    width: 100%;
    border-radius: ${props => props.theme.radius};
    padding: 8px 16px;
    border: 2px solid transparent;
    transition: 0.2s ease-out;

    &.default {
      background-color: ${props => props.theme.colors.light};
    }

    &.white {
      background-color: ${props => props.theme.colors.white};
      box-shadow: ${props => props.theme.shadow};
    }

    &:focus {
      border-color: ${props => props.theme.colors.secondary};
    }

    &:disabled {
      opacity: 0.65;
    }

    &::placeholder {
      color: ${props => props.theme.colors.dark_disabled};
    }

    ${props =>
      props.hasError &&
      css`
        border-color: ${props.theme.colors.error};
        padding-right: 42px;
      `}
  }

  .react-datepicker__close-icon::after {
    background: transparent;
    font-size: 24px;
    padding-top: 5px;
    color: ${props => props.theme.colors.light_disabled};
  }
`;

export const Error = styled(Tooltip).attrs({
  variant: 'error',
})`
  position: absolute !important;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;

  svg {
    color: ${props => props.theme.colors.error};
    cursor: pointer;
  }
`;
