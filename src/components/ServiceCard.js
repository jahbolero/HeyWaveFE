import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
  Badge,
  HStack,
  Avatar,
  VStack,
  Button,
} from '@chakra-ui/react';
import { AiOutlineClockCircle, AiFillStar } from 'react-icons/ai';

const ServiceCard = ({ service }) => {
  const {
    title,
    description,
    tags,
    pricing,
    duration,
    user,
    stats,
    image = `https://api.dicebear.com/7.x/shapes/svg?seed=${service.id}`,
  } = service;

  return (
    <Card 
      overflow="hidden" 
      variant="outline"
      _hover={{ 
        transform: 'translateY(-4px)', 
        boxShadow: 'lg',
        borderColor: 'blue.200'
      }}
      transition="all 0.2s"
    >
      <Image
        src={image}
        alt={title}
        height="200px"
        objectFit="cover"
      />

      <CardBody>
        <Stack spacing={4}>
          {/* Tags */}
          <HStack spacing={2}>
            {tags?.map((tag, index) => (
              <Badge 
                key={index} 
                colorScheme="blue" 
                variant="subtle"
                borderRadius="full"
              >
                {tag}
              </Badge>
            ))}
          </HStack>

          {/* Title and Description */}
          <Box>
            <Heading size="md" mb={2}>{title}</Heading>
            <Text noOfLines={2} color="gray.600">
              {description}
            </Text>
          </Box>

          {/* User Info */}
          <HStack spacing={3}>
            <Avatar 
              size="sm" 
              name={user?.name} 
              src={user?.avatar}
            />
            <VStack spacing={0} align="start">
              <Text fontWeight="medium">{user?.name}</Text>
              {user?.verified && (
                <Badge colorScheme="green" variant="subtle" size="sm">
                  Verified
                </Badge>
              )}
            </VStack>
          </HStack>

          {/* Stats */}
          <HStack spacing={4} color="gray.600">
            <Flex align="center" gap={1}>
              <AiOutlineClockCircle />
              <Text fontSize="sm">{duration} min</Text>
            </Flex>
            {stats?.averageRating && (
              <Flex align="center" gap={1}>
                <AiFillStar color="#F6E05E" />
                <Text fontSize="sm">{stats.averageRating}</Text>
              </Flex>
            )}
          </HStack>

          {/* Price and Action */}
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                {pricing?.basePrice} TON
              </Text>
              <Text fontSize="sm" color="gray.500">
                per session
              </Text>
            </Box>
            <Button 
              colorScheme="blue" 
              size="sm"
              variant="outline"
            >
              Book Now
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ServiceCard; 