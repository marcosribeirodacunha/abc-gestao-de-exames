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

  /* React-toastify customization */
  .Toastify {
    &__progress-bar {
      margin: 4px;
      width: calc(100% - 8px);
      border-radius: 8px;
      height: 4px;

      &--default {
        background: ${props => props.theme.colors.secondary};

      }
    }

    &__toast {
    border-radius: ${props => props.theme.radius};
    box-shadow: ${props => props.theme.shadow};
    padding: 12px 12px 16px 16px;

      &--default {
        color: ${props => props.theme.colors.dark}
      }

      &--error {
        background-color: ${props => props.theme.colors.error}
      }

      &-body {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        line-height: 1.5;
        margin-right: 12px;
      }
    }

  }

`;
