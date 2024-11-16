import theme from "@/theme"
import { ChakraProvider, Box, Heading, Spinner, Center, HStack, Text, Image, VStack } from "@chakra-ui/react"

export const AppLoader = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box pos="relative" h="100vh" bgImage="https://placehold.co/1080x1920/000/fff?text=SPLASH" fontWeight="bold" bgSize="cover" bgPos="center center">
        <Center h="100vh">
          <VStack>
            <Image 
              src="https://placehold.co/100x100/111/fff?text=LOGO"
              boxSize={100}
              />
            <HStack>
              <Spinner size="xs" mr={2} />
              <Heading size="sm">Initializing App</Heading>
            </HStack>
          </VStack>      
        </Center>
        <Box pos="absolute" textAlign="center" bottom={10} left={0} w="full">
          <Text textAlign="center" fontSize={12} mb={2} color="whiteAlpha.500">Powered by <b>Xircus</b></Text>
        </Box>
      </Box>
    </ChakraProvider>
  )
}