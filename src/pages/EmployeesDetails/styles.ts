import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    ${card}
    width: 448px;
    position: relative;
    margin-top: 6rem;

    > div:nth-child(2) {
      margin-top: 100px;
    }
  }

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

export const DeleteEmployee = styled.div`
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
