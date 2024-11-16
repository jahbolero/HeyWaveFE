import { extendTheme } from "@chakra-ui/react"

export const config = {
  cssVarPrefix: 'xw3',  
  initialColorMode: 'dark',
  useSystemColorMode: false
}

export const styles = {
  global: (props) => ({
    ':root': {
      '--popover-bg': 'orange'
    },
    body: {
      backgroundColor: props.colorMode === 'dark' ? 'blackAlpha.900' : 'white',
      outline: '0px !important',
      h: '100vh',
      overflow: 'hidden',
    },
    '#tc-widget-root': {
      zIndex: 4000,
      pos: 'absolute'
    },
  }),
}

const createInputBorder = props => ({
  borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
  _hover: {
    borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',      
  },
  _focus: {
    borderColor: props.colorMode == 'light' ? 'gray.400' : 'gray.600',                        
  }
})

const createFieldBorder = props => ({
  field: {
    placeholderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',    
    borderColor: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
    _hover: {
      borderColor: props.colorMode == 'light' ? 'gray.300' : 'gray.700',      
    },
    _focus: {
      borderColor: props.colorMode == 'light' ? 'gray.400' : 'gray.600',                        
    }    
  }
})

export const components = {
  Divider: {
    baseStyle: {
      borderColor: 'gray.200',
      _dark: {
        borderColor: 'gray.900'
      }
    }
  },
  Alert: {
    baseStyle: {
      container: {
        bg: 'gray.600',
        color: 'black',
        backdropFilter: 'blur(20px)',
        _dark: {
          bg: 'blackAlpha.900',
          color: 'white'
        }
      },
      description: {
        color: 'white'
      },
      icon: {
        color: 'white'
      },
      title: {
        color: 'white'
      }
    },
    defaultProps: {
      variant: 'solid',
    }
  },
  Menu: {
    baseStyle: {
      list: {
        _dark: {
          borderColor: 'gray.900',
          '--menu-bg': 'colors.gray.900',
        }
      }
    }
  },
  Popover: {
    baseStyle: {
      content: {
        borderWidth: 1,
      }
    }
  },
  Accordion: {
    baseStyle: {
      button: { fontWeight: 'bold' },
      container: { borderTopWidth: 0, _last: { borderBottomWidth: 0 } }      
    }
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'transparent'
    },
    variants: {
      outline: createInputBorder,
      filled: props => ({
        bg: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
        _hover: {
          bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },
        _focus: {
          bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
        },
        borderColor: 'transparent'
      })
    },
  },
  Select: {
    variants: {
      outline: createFieldBorder,
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'transparent',
    },
    variants: {
      outline: createFieldBorder,
      filled: props => ({
        field: {
          bg: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
          _hover: {
            bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          },
          _focus: {
            bg: props.colorMode == 'light' ? 'gray.200' : 'gray.800',
          },
          borderColor: 'transparent'
        }
      }) 
    }
  },
  Code: {
    baseStyle: {
      bg: 'gray.50',
      _dark: {
        bg: 'gray.900'
      }
    }
  },
  Button: {
    variants: {
      solid: props => ({
        bg: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        _hover: {
          bg: props.colorMode == 'dark' ? 'gray.700' : 'gray.300',          
        }
      }),
      outline: props => ({
        borderWidth: 1,
        borderColor: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        _hover: {
          bg: props.colorMode == 'dark' ? 'gray.900' : 'gray.100',
        }
      })
    },
  }
}

export default extendTheme({
  config,
  styles,
  components
})