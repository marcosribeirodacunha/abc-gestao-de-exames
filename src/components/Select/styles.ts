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

    .default > .react-select__control {
      background-color: ${props => props.theme.colors.light};

      &--is-disabled {
        background-color: ${props => props.theme.colors.light_disabled};
      }
    }

    .white > .react-select__control {
      background-color: ${props => props.theme.colors.white};
      box-shadow: ${props => props.theme.shadow};
    }
  }

  .react-select {
    &__control {
      cursor: pointer;
      width: 100%;
      border-radius: ${props => props.theme.radius};
      border: 2px solid transparent;

      ${props =>
        props.hasError &&
        css`
          border-color: ${props.theme.colors.error};
          padding-right: 32px;
        `}

      &--is-focused,
      &:hover {
        border-color: ${props => props.theme.colors.secondary};
      }
    }

    &__option {
      padding: 10px 16px;
      cursor: pointer;

      &--is-focused {
        background: ${props => props.theme.colors.light};
      }

      &--is-selected {
        background: ${props => props.theme.colors.secondary};
      }

      &:active {
        background: ${props => props.theme.colors.light_disabled};
      }
    }

    &__value-container {
      padding: 4px 14px;
    }

    &__placeholder {
      color: ${props => props.theme.colors.dark_disabled};
    }

    &__single-value {
      &--is-disabled {
        color: ${props => props.theme.colors.dark_disabled};
      }
    }
  }
`;

/* Tooltip for errors */

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
