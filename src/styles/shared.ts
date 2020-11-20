import { css } from 'styled-components';

export const card = css`
  padding: 24px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
`;
