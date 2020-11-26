import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .button-row {
    display: flex;
    margin-top: 0;

    button {
      flex: 1;

      & + button {
        margin-left: 8px;
      }
    }
  }
`;

export const EmployeeDataForm = styled(Unform)`
  ${card}
  width: 448px;
  position: relative;
  margin-top: 6rem;
  margin-right: 2rem;

  > div:nth-child(2) {
    margin-top: 100px;
  }
`;

export const ExamData = styled.div`
  h1 {
    font-size: ${props => props.theme.sizes.heading};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 3rem;
    text-align: center;
  }

  form {
    ${card}
    width: 448px;
    position: relative;

    > p {
      margin-top: 0.5rem;
      font-size: ${props => props.theme.sizes.x_small};
      color: ${props => props.theme.colors.dark_disabled};
    }
  }
`;

export const DeleteExam = styled.div`
  ${card}
  width: 448px;
  margin-top: 2rem;

  h2 {
    text-align: center;
    font-size: ${props => props.theme.sizes.sub_heading};
    color: ${props => props.theme.colors.error};
  }

  p {
    font-size: ${props => props.theme.sizes.small};
    text-align: justify;
    margin: 8px 0 0;
  }
`;
