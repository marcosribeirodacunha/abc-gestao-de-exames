import { Form as Unform } from '@unform/web';
import styled from 'styled-components';

import { card } from '../../styles/shared';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(Unform)`
  ${card};
  width: 100%;
  max-width: 400px;
  margin: 16px;

  h1 {
    font-size: ${props => props.theme.sizes.heading};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    margin-bottom: 12px;
  }
`;
