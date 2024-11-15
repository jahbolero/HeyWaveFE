import React, { useState } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import RecipientCard from './components/RecipientCard';
import BottomMenu from './components/BottomMenu';
import recipients from './data/recipients';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || recipient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxW="container.xl" py={4}>
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <Box 
        mt={6} 
        display="grid" 
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
        gap={6}
        pb={20}
      >
        {filteredRecipients.map(recipient => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
          />
        ))}
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Box 
          bgColor="pastel.blue" 
          py={4} 
          px={4} 
          mb={6}
        >
          <Heading color="white" textAlign="center" size="lg">
            Find Recipients
          </Heading>
        </Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/placeholder1" element={<Box p={4}>Menu 2 Content</Box>} />
          <Route path="/placeholder2" element={<Box p={4}>Menu 3 Content</Box>} />
          <Route path="/placeholder3" element={<Box p={4}>Menu 4 Content</Box>} />
        </Routes>
        <BottomMenu />
      </Box>
    </Router>
  );
}

export default App;
