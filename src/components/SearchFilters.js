import React from 'react';
import {
  VStack,
  HStack,
  Input,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Box,
} from '@chakra-ui/react';

const SearchFilters = ({ onSearch, onFilterChange }) => {
  return (
    <VStack 
      spacing={4} 
      p={4} 
      bg="white" 
      borderRadius="20px"
      shadow="sm"
    >
      <Input
        placeholder="Search for services or recipients"
        size="lg"
        bg="pastel.background"
        borderRadius="15px"
        _focus={{
          borderColor: 'pastel.primary',
          boxShadow: '0 0 0 1px var(--chakra-colors-pastel-primary)',
        }}
      />
      
      <HStack w="full" spacing={4}>
        <Select 
          placeholder="Category"
          size="lg"
          bg="pastel.background"
          borderRadius="15px"
        >
          <option value="mentoring">Mentoring</option>
          <option value="pitch-review">Pitch Review</option>
          <option value="qa">Q&A</option>
          <option value="consulting">Consulting</option>
        </Select>
        
        <Box w="full">
          <Text mb={2} fontSize="sm" color="gray.600">
            Bid Range (TON)
          </Text>
          <RangeSlider
            defaultValue={[0, 1000]}
            min={0}
            max={5000}
            step={100}
          >
            <RangeSliderTrack bg="pastel.secondary">
              <RangeSliderFilledTrack bg="pastel.primary" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>
      </HStack>
    </VStack>
  );
};

export default SearchFilters; 