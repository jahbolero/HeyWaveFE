import React from 'react';
import {
  Box,
  Input,
  Select,
  HStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onCategoryChange,
  categories = [] 
}) => {
  return (
    <Box 
      position="sticky" 
      top={0} 
      zIndex={20}
      bg="rgba(247, 250, 252, 0.95)"
      backdropFilter="blur(12px)"
      px={4}
      py={3}
    >
      <HStack spacing={3}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BiSearch color="#ACC8E5" />
          </InputLeftElement>
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            pl={10}
          />
        </InputGroup>
        
        <Select
          placeholder="All Categories"
          onChange={(e) => onCategoryChange(e.target.value)}
          minW="150px"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default SearchBar; 