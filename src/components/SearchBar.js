import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Select,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ searchTerm, onSearchChange, onCategoryChange }) => {
  return (
    <Box 
      position="sticky" 
      top={0} 
      zIndex={20}
      bg="pastel.background"
      backdropFilter="blur(12px)"
      px={4}
      py={3}
      borderBottom="1.5px solid"
      borderColor="pastel.secondary"
    >
      <HStack spacing={3}>
        <InputGroup>
          <InputLeftElement 
            pointerEvents="none" 
            h="50px"
            children={<BiSearch size={20} color="#ACC8E5" />}
          />
          <Input
            placeholder="Search recipients..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            pl={10}
          />
        </InputGroup>
        <Select
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="Filter"
          minW="100px"
          maxW="120px"
        >
          <option value="mentorship">Mentorship</option>
          <option value="funding">Funding</option>
          <option value="qa">Q&A</option>
        </Select>
      </HStack>
    </Box>
  );
};

export default SearchBar; 