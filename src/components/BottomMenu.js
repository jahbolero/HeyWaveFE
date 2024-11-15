import React from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCompass, AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

const MenuItem = ({ icon, label, to, isActive }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <VStack 
        spacing={1} 
        color={isActive ? 'pastel.blue' : 'gray.400'}
        transition="all 0.2s"
        w="70px"
      >
        <Box 
          p={3} 
          borderRadius="xl"
          bgColor={isActive ? 'pastel.lightBlue' : 'transparent'}
          transition="all 0.2s"
        >
          {icon}
        </Box>
        <Text 
          fontSize="xs" 
          fontWeight={isActive ? "600" : "400"}
        >
          {label}
        </Text>
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
      py={2}
      px={4}
      borderTop="1px solid"
      borderColor="gray.100"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <HStack justify="space-around" maxW="container.xl" mx="auto">
        <MenuItem
          icon={<AiOutlineHome size={24} />}
          label="Home"
          to="/"
          isActive={location.pathname === '/'}
        />
        <MenuItem
          icon={<AiOutlineCompass size={24} />}
          label="Explore"
          to="/placeholder1"
          isActive={location.pathname === '/placeholder1'}
        />
        <MenuItem
          icon={<AiOutlineBell size={24} />}
          label="Notifications"
          to="/placeholder2"
          isActive={location.pathname === '/placeholder2'}
        />
        <MenuItem
          icon={<AiOutlineUser size={24} />}
          label="Profile"
          to="/placeholder3"
          isActive={location.pathname === '/placeholder3'}
        />
      </HStack>
    </Box>
  );
};

export default BottomMenu;