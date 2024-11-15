import React from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';

const MenuItem = ({ icon, label, to, isActive }) => {
  return (
    <Link to={to}>
      <VStack 
        spacing={1} 
        color={isActive ? 'blue.500' : 'gray.600'}
        transition="all 0.2s"
      >
        {icon}
        <Text fontSize="xs">{label}</Text>
      </VStack>
    </Link>
  );
};

const BottomMenu = () => {
  const location = useLocation();

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      shadow="lg"
      py={3}
    >
      <HStack justify="space-around">
        <MenuItem
          icon={<AiOutlineHome size={24} />}
          label="Home"
          to="/"
          isActive={location.pathname === '/'}
        />
        <MenuItem
          icon={<AiOutlineQuestionCircle size={24} />}
          label="Menu 2"
          to="/placeholder1"
          isActive={location.pathname === '/placeholder1'}
        />
        <MenuItem
          icon={<AiOutlineSetting size={24} />}
          label="Menu 3"
          to="/placeholder2"
          isActive={location.pathname === '/placeholder2'}
        />
        <MenuItem
          icon={<AiOutlineUser size={24} />}
          label="Menu 4"
          to="/placeholder3"
          isActive={location.pathname === '/placeholder3'}
        />
      </HStack>
    </Box>
  );
};

export default BottomMenu;