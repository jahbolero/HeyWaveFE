import React from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

const MenuItem = ({ icon, label, to, isActive }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <VStack 
      spacing={1} 
      color={isActive ? 'blue.500' : 'gray.500'}
      transition="all 0.2s"
    >
      <Box p={3}>
        {icon}
      </Box>
      <Text fontSize="xs">{label}</Text>
    </VStack>
  </Link>
);

const BottomMenu = () => {
  const location = useLocation();
  
  return (
    <Box 
      position="fixed" 
      bottom={0} 
      left={0} 
      right={0}
      borderTop="1px solid"
      borderColor="gray.100"
      bg="white"
      py={2}
      px={4}
    >
      <HStack justify="space-around">
        <MenuItem 
          icon={<AiOutlineHome size={24} />}
          label="Home"
          to="/"
          isActive={location.pathname === '/'}
        />
        <MenuItem 
          icon={<AiOutlineCompass size={24} />}
          label="Explore"
          to="/explore"
          isActive={location.pathname === '/explore'}
        />
        <MenuItem 
          icon={<AiOutlineBell size={24} />}
          label="Notifications"
          to="/notifications"
          isActive={location.pathname === '/notifications'}
        />
        <MenuItem 
          icon={<AiOutlineUser size={24} />}
          label="Profile"
          to="/profile"
          isActive={location.pathname === '/profile'}
        />
      </HStack>
    </Box>
  );
};

export default BottomMenu;