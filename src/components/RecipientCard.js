import React from 'react';
import { Box, Badge, Text, Button, VStack, HStack, Heading } from '@chakra-ui/react';

const RecipientCard = ({ recipient }) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      shadow="md"
      transition="all 0.2s"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md">{recipient.name}</Heading>
        <Badge colorScheme="blue" alignSelf="flex-start">
          {recipient.category}
        </Badge>
        <Text fontWeight="bold" color="gray.600">
          {recipient.expertise}
        </Text>
        <Text color="gray.500">
          {recipient.description}
        </Text>
        <HStack justify="space-between" pt={2}>
          <Text color="gray.600" fontWeight="semibold">
            Minimum Bid: ${recipient.bidMinimum}
          </Text>
          <Button colorScheme="blue">
            Place a Bid
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RecipientCard;