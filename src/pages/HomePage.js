import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  VStack,
  Card,
  CardBody,
  Badge,
  Image,
  Progress,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AiFillFire, AiOutlineClockCircle } from 'react-icons/ai';
import api from '../api/api';
import {SendTransactionRequest, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";

const StatCard = ({ label, value, helpText, accentColor }) => (
  <Card>
    <CardBody>
      <Stat>
        <StatLabel color="gray.500">{label}</StatLabel>
        <StatNumber color={accentColor}>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

const TrendingAuctionCard = ({ auction }) => (
  <Card>
    <CardBody>
      <Grid templateColumns="100px 1fr" gap={4}>
        <Image
          src={auction.image}
          alt={auction.title}
          borderRadius="lg"
          objectFit="cover"
          h="100px"
        />
        <Box>
          <HStack mb={2}>
            <Badge colorScheme="red">
              <HStack spacing={1}>
                <AiFillFire />
                <Text>Hot</Text>
              </HStack>
            </Badge>
            <Badge colorScheme="blue">{auction.category}</Badge>
          </HStack>
          <Heading size="sm" mb={2}>{auction.title}</Heading>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Current Bid: {auction.pricing?.basePrice} TON
          </Text>
          <HStack fontSize="sm" color="gray.500">
            <AiOutlineClockCircle />
            <Text>{auction.timeLeft}</Text>
          </HStack>
          <Progress 
            value={auction.progress} 
            size="sm" 
            colorScheme="blue" 
            mt={2}
          />
        </Box>
      </Grid>
    </CardBody>
  </Card>
);

const ActivityCard = ({ activity }) => (
  <Card w="full">
    <CardBody>
      <HStack justify="space-between">
        <HStack spacing={4}>
          <Image
            src={activity.userImage}
            alt={activity.userName}
            borderRadius="full"
            boxSize="40px"
          />
          <VStack align="start" spacing={0}>
            <Text fontWeight="medium">
              {activity.userName} {activity.action}
            </Text>
            <Text fontSize="sm" color="gray.500">{activity.timestamp}</Text>
          </VStack>
        </HStack>
        <Text fontWeight="bold" color="blue.500">
          {activity.amount} TON
        </Text>
      </HStack>
    </CardBody>
  </Card>
);

const HomePage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Center h="calc(100vh - 100px)">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={6}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!dashboardData) {
    return (
      <Container maxW="container.xl" py={6}>
        <Alert status="info">
          <AlertIcon />
          No dashboard data available
        </Alert>
      </Container>
    );
  }

  const { stats, trendingAuctions, recentActivity } = dashboardData;

  return (
    
    <Container maxW="container.xl" py={6}>
              <button onClick={() => tonConnectUi.openModal()}>
          Connect wallet to send the transaction
        </button>
      {/* Stats Overview */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <StatCard
          label="Active Bids"
          value={stats?.activeBids || 0}
          helpText="Current active bids"
          accentColor="blue.400"
        />
        <StatCard
          label="Won Auctions"
          value={stats?.wonAuctions || 0}
          helpText="This month"
          accentColor="green.400"
        />
        <StatCard
          label="TON Spent"
          value={stats?.tonSpent || 0}
          helpText="Last 30 days"
          accentColor="purple.400"
        />
      </Grid>

      {/* Trending Auctions */}
      {trendingAuctions?.length > 0 && (
        <Box mb={8}>
          <HStack mb={4} justify="space-between">
            <Heading size="md">🔥 Trending Now</Heading>
            <Text color="blue.500" cursor="pointer">See all</Text>
          </HStack>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {trendingAuctions.map((auction) => (
              <TrendingAuctionCard key={auction.id} auction={auction} />
            ))}
          </Grid>
        </Box>
      )}

      {/* Recent Activity */}
      {recentActivity?.length > 0 && (
        <Box mb={8}>
          <Heading size="md" mb={4}>Recent Activity</Heading>
          <VStack spacing={4}>
            {recentActivity.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </VStack>
        </Box>
      )}
    </Container>
  );
};

export default HomePage; 