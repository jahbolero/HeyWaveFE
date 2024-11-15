import React from 'react';
import { Input, Select, HStack, Box } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ searchTerm, onSearchChange, onCategoryChange }) => {
  return (
    <HStack spacing={4} p={4}>
      <Box position="relative" flex="1">
        <BiSearch
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#A0AEC0',
            zIndex: 1,
          }}
          size={20}
        />
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          bg="white"
          borderRadius="lg"
          pl={10}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px #3182ce"
          }}
        />
      </Box>
      <Select
        onChange={(e) => onCategoryChange(e.target.value)}
        bg="white"
        borderRadius="lg"
        w="200px"
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px #3182ce"
        }}
      >
        <option value="">All Categories</option>
        <option value="mentorship">Mentorship</option>
        <option value="funding">Funding</option>
        <option value="qa">Q&A</option>
      </Select>
    </HStack>
  );
};

export default SearchBar; 