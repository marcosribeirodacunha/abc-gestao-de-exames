import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  span {
    width: max-content;
    max-width: 180px;
    padding: 8px;
    border-radius: ${props => props.theme.radius};
    font-size: ${props => props.theme.sizes.small};
    font-weight: 500;
    text-align: center;

    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &.default {
      background-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.dark};

      &::before {
        border-color: ${props => props.theme.colors.secondary} transparent;
      }
    }

    &.error {
      background-color: ${props => props.theme.colors.error};
      color: ${props => props.theme.colors.white};

      &::before {
        border-color: ${props => props.theme.colors.error} transparent;
      }
    }
  }
`;
