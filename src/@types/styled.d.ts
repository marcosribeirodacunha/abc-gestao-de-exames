import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      dark: string;
      primary: string;
      secondary: string;
      light: string;
      white: string;

      dark_hover: string;
      primary_hover: string;
      secondary_hover: string;
      light_hover: string;

      dark_disabled: string;
      primary_disabled: string;
      secondary_disabled: string;
      light_disabled: string;

      primary_light: string;

      error: string;
      error_light: string;
      error_dark: string;
      warn: string;
      warn_light: string;
      success: string;
      success_light: string;

      lightgray: string;
    };

    sizes: {
      heading: string;
      sub_heading: string;
      default: string;
      small: string;
      x_small: string;
    };

    shadow: string;
    radius: string;
  }
}
