import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    action: Palette['action'] & {
      button: string;
      buttonHover: string;
    };
    text: Palette['text'] & {
      highlight?: string;
    };
  }

  interface PaletteOptions {
    action?: PaletteOptions['action'] & {
      button?: string;
      buttonHover?: string;
    };
    text?: PaletteOptions['text'] & {
      highlight?: string;
    };
  }
}
