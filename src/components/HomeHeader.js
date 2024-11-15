import React from 'react';
import { VStack, Heading, Text, Box } from '@chakra-ui/react';

const HomeHeader = () => {
  return (
    <Box 
      bgGradient="linear(to-r, pastel.primary, pastel.secondary)"
      py={6}
      px={4}
      borderBottomRadius="24px"
      mb={4}
    >
      <VStack spacing={2} color="white">
        <Heading size="lg" fontWeight="700">
          Explore Opportunities
        </Heading>
        <Text 
          fontSize="md" 
          textAlign="center" 
          opacity={0.9}
          maxW="300px"
        >
          Browse available services and items to bid on
        </Text>
      </VStack>
    </Box>
  );
};

export default HomeHeader; 