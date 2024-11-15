import React, { useState, useEffect } from 'react';
import {
  Container,
  SimpleGrid,
  Spinner,
  Center,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import api from '../api/api';

function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getServices({
          page,
          limit: 12,
          tags: selectedCategory ? [selectedCategory] : [],
          search: searchTerm
        });
        setServices(prev => 
          page === 1 ? response.services : [...prev, ...response.services]
        );
      } catch (error) {
        setError(error.message || 'Error fetching services');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm, selectedCategory, page]);

  if (error) {
    return (
      <Container maxW="container.xl" py={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={4}>
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {loading && page === 1 ? (
        <Center h="200px">
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={6} 
            w="full"
            py={6}
          >
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </SimpleGrid>

          <Center py={8}>
            <Button
              onClick={() => setPage(p => p + 1)}
              isLoading={loading}
              loadingText="Loading more..."
              size="lg"
              colorScheme="blue"
            >
              Load More
            </Button>
          </Center>
        </>
      )}
    </Container>
  );
}

export default ExplorePage; 