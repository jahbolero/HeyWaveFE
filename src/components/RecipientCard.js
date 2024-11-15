import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Button,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';

const RecipientCard = ({ recipient }) => {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ 
        shadow: 'md', 
        transform: 'translateY(-2px)',
        borderColor: 'pastel.blue' 
      }}
      border="1px solid"
      borderColor="pastel.lightBlue"
    >
      <Box p={6}>
        <VStack align="stretch" spacing={4}>
          <HStack spacing={4}>
            <Image
              src={recipient.avatar}
              alt={recipient.name}
              boxSize="60px"
              borderRadius="xl"
              bg="gray.100"
            />
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold" fontSize="lg">
                {recipient.name}
              </Text>
              <HStack spacing={2}>
                <Badge 
                  colorScheme="blue" 
                  bg="pastel.lightBlue" 
                  color="brand.500"
                  borderRadius="full"
                >
                  {recipient.category}
                </Badge>
                <HStack spacing={1}>
                  <Icon as={AiFillStar} color="yellow.400" />
                  <Text fontSize="sm" color="gray.600">
                    {recipient.rating}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>

          <Text color="gray.600" fontSize="sm">
            {recipient.description}
          </Text>

          <HStack justify="space-between" pt={2}>
            <HStack spacing={2}>
              <Icon as={BsBriefcase} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                {recipient.completedProjects} projects
              </Text>
            </HStack>
            <Text fontWeight="bold" color="blue.500">
              ${recipient.bidMinimum}
            </Text>
          </HStack>

          <Button 
            bgColor="pastel.blue"
            _hover={{ bgColor: 'brand.400' }}
            size="lg" 
            borderRadius="xl"
            h="48px"
            color="white"
            w="100%"
          >
            Contact
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default RecipientCard;