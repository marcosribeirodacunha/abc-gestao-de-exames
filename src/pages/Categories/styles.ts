import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div`
  h1 {
    text-align: center;
    font-size: ${props => props.theme.sizes.heading};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 3rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const CategoriesTable = styled.section`
  ${card}
  min-width: 448px;
  margin-right: 2rem;

  header {
    padding: 16px 24px 15px;
    border-bottom: 1px solid ${props => props.theme.colors.light};

    strong {
      font-weight: 600;
    }
  }

  main {
    div {
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      border: 1px solid transparent;
      border-radius: ${props => props.theme.radius};

      &.deleting {
        border-color: ${props => props.theme.colors.error};
      }
    }

    p {
      flex: 1;
      margin-right: 12px;
    }

    span {
      display: flex;
      align-items: center;
    }
  }
`;

export const CreateForm = styled(Unform)`
  ${card}
  min-width: 352px;

  p {
    text-align: center;
    margin-bottom: 1rem;
  }
`;
