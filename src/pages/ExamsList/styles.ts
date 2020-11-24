import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: ${props => props.theme.sizes.heading};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 3rem;
  }
`;

export const Filters = styled.div`
  width: 100%;

  p {
    color: ${props => props.theme.colors.dark_disabled};
    margin-bottom: 1.5rem;
  }

  form {
    .row-top,
    .row-bottom {
      display: flex;
      align-items: center;

      & + div {
        margin-top: 16px;
      }

      /* form-control */
      > div {
        width: 100%;
        margin-top: 0;

        & + div {
          margin-left: 2rem;
        }
      }
    }

    /* form-control */
    .row-top > div {
      &:first-child {
        min-width: 448px;
      }

      &:last-child {
        min-width: 352px;
      }
    }

    .row-bottom > div {
      &:first-child,
      &:nth-child(2) {
        min-width: 352px;
      }
    }

    .due-date {
      display: flex;
      position: relative;

      &:before {
        position: absolute;
        content: '';
        width: 10px;
        height: 2px;
        border-radius: 4px;
        bottom: 21px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${props => props.theme.colors.dark_disabled};
      }

      > div + div {
        margin-top: 0;
        margin-left: 32px;
      }
    }
  }
`;

export const ExamsTable = styled.section`
  ${card}
  width: 100%;
  margin-top: 3rem;

  header,
  main > div {
    padding: 16px 24px;

    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 202px 187px 200px 119px 90px 106px 24px;
  }

  header {
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.light};

    strong {
      font-weight: 600;
    }
  }

  main {
    > div {
      border-radius: ${props => props.theme.radius};
      cursor: pointer;
      transition: 0.2s;
      position: relative;

      &:before {
        position: absolute;
        content: '';
        top: 2px;
        left: 2px;
        width: 4px;
        height: calc(100% - 4px);
        border-radius: 4px;
        transition: 0.2s;
      }

      &:hover {
        background-color: ${props => props.theme.colors.light};

        svg {
          color: ${props => props.theme.colors.secondary};
        }

        &:before {
          background: ${props => props.theme.colors.secondary};
        }
      }

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      svg {
        color: ${props => props.theme.colors.light_disabled};
      }
    }
  }
`;

export const Badge = styled.span`
  display: inline-block;
  border-radius: ${props => props.theme.radius};
  font-size: ${props => props.theme.sizes.small};
  padding: 4px 8px;

  &.red {
    color: ${props => props.theme.colors.error};
    background: ${props => props.theme.colors.error_light};
  }

  &.green {
    color: ${props => props.theme.colors.success};
    background: ${props => props.theme.colors.success_light};
  }
`;
