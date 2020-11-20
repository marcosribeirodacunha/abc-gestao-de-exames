import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    background: ${props => props.theme.colors.light};
  }

  body, input, button, textarea {
    font-size: ${props => props.theme.sizes.default};
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: ${props => props.theme.colors.dark};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.5;
  }
`;
