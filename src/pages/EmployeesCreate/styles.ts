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
    margin-bottom: 9rem;
  }

  form {
    ${card}
    width: 448px;
    position: relative;

    > div:nth-child(2) {
      margin-top: 100px;
    }
  }
`;
