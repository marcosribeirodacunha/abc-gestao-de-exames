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

export const Table = styled.section`
  ${card}
  width: 100%;
  max-width: 928px;

  header,
  main > div {
    padding: 16px 24px;

    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 280px 208px 128px 128px 24px;
  }

  header {
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.light};

    strong {
      font-weight: 600;
    }
  }

  main {
    p {
      margin-top: 2rem;
      text-align: center;
    }

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
