import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Icon,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { 
  AiFillStar, 
  AiOutlineClockCircle, 
  AiFillCheckCircle 
} from 'react-icons/ai';
import { format } from 'date-fns';

const OpportunityCard = ({ opportunity }) => {
  const {
    image = "https://via.placeholder.com/200",
    name = "Unknown Expert",
    verified = false,
    rating = 0,
    category = "Unknown",
    duration = 30,
    description = "No description available",
    expertise = [],
    currentBid = 0,
    minBid = 0,
    totalBids = 0,
    availability = { nextAvailable: new Date() }
  } = opportunity || {};

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-4px)', 
        shadow: 'lg',
        borderColor: 'pastel.primary' 
      }}
      border="1px solid"
      borderColor="gray.100"
    >
      <Box position="relative">
        <Image
          src={image}
          alt={name}
          h="200px"
          w="full"
          objectFit="cover"
        />
        {verified && (
          <Tooltip label="Verified Expert" placement="top">
            <Box position="absolute" top={4} right={4}>
              <Icon as={AiFillCheckCircle} w={6} h={6} color="blue.400" />
            </Box>
          </Tooltip>
        )}
      </Box>

      <VStack p={4} align="stretch" spacing={4}>
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" width="full">
            <Text fontWeight="bold" fontSize="lg">
              {name}
            </Text>
            {rating > 0 && (
              <HStack spacing={1}>
                <Icon as={AiFillStar} color="yellow.400" />
                <Text fontWeight="semibold">{rating}</Text>
              </HStack>
            )}
          </HStack>

          <HStack spacing={2}>
            <Badge 
              colorScheme="blue" 
              bg="blue.50"
              color="blue.600"
              px={2} 
              py={1} 
              borderRadius="full"
            >
              {category}
            </Badge>
            <Badge 
              colorScheme="green" 
              bg="green.50"
              color="green.600"
              px={2} 
              py={1} 
              borderRadius="full"
            >
              {duration} min
            </Badge>
          </HStack>
        </VStack>

        <Text color="gray.600" noOfLines={2}>
          {description}
        </Text>

        {expertise.length > 0 && (
          <HStack spacing={2} flexWrap="wrap">
            {expertise.slice(0, 3).map((skill, index) => (
              <Tag
                key={index}
                size="sm"
                borderRadius="full"
                variant="subtle"
                colorScheme="gray"
              >
                <TagLabel>{skill}</TagLabel>
              </Tag>
            ))}
          </HStack>
        )}

        <Divider />

        <VStack spacing={3}>
          <HStack justify="space-between" width="full">
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.500">
                Current Bid
              </Text>
              <Text fontWeight="bold" color="blue.600" fontSize="lg">
                {currentBid} TON
              </Text>
            </VStack>
            <VStack align="end" spacing={0}>
              <Text fontSize="sm" color="gray.500">
                Min. Bid
              </Text>
              <Text color="gray.600">
                {minBid} TON
              </Text>
            </VStack>
          </HStack>

          <HStack justify="space-between" width="full">
            <HStack spacing={1}>
              <Icon as={AiOutlineClockCircle} color="gray.500" />
              <Text fontSize="sm" color="gray.500">
                Next available: {format(new Date(availability.nextAvailable), 'MMM d')}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {totalBids} bids
            </Text>
          </HStack>

          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            size="lg"
            borderRadius="xl"
            width="full"
          >
            Place Bid
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default OpportunityCard; 