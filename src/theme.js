import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#3182CE',
    600: '#2B6CB0',
    700: '#2C5282',
    800: '#2A4365',
    900: '#1A365D',
  },
  pastel: {
    primary: '#ACC8E5',
    secondary: '#CAE1FF',
    tertiary: '#B8E2F2',
    background: '#F5F9FF',
    highlight: '#DDF3FF',
  }
};

const theme = extendTheme({
  colors,
  components: {
    Input: {
      variants: {
        custom: {
          field: {
            bg: 'white',
            height: '50px',
            fontSize: '16px',
            borderRadius: '15px',
            border: '1.5px solid',
            borderColor: 'pastel.secondary',
            _focus: {
              borderColor: 'pastel.primary',
              boxShadow: '0 0 0 1px var(--chakra-colors-pastel-primary)',
              bg: 'white',
            },
            _hover: {
              borderColor: 'pastel.primary',
            },
            _placeholder: {
              color: 'gray.400',
            },
          },
        },
      },
      defaultProps: {
        variant: 'custom',
      },
    },
    Select: {
      variants: {
        custom: {
          field: {
            bg: 'white',
            height: '50px',
            fontSize: '16px',
            borderRadius: '15px',
            border: '1.5px solid',
            borderColor: 'pastel.secondary',
            _focus: {
              borderColor: 'pastel.primary',
              boxShadow: '0 0 0 1px var(--chakra-colors-pastel-primary)',
              bg: 'white',
            },
            _hover: {
              borderColor: 'pastel.primary',
            },
          },
        },
      },
      defaultProps: {
        variant: 'custom',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'pastel.background',
        color: 'gray.800',
      },
    },
  },
});

export default theme; 