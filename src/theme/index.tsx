import { extendTheme } from '@chakra-ui/react';

const defaultFonts = "'Poppins', Arial, sans-serif, 'Noto Color Emoji'";
export const fonts = {
  body: defaultFonts,
  heading: defaultFonts,
  mono: defaultFonts
};

export const theme = extendTheme({
  fonts
});
