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
