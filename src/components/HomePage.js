// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   VStack,
//   Spinner,
//   Text,
//   useIntersectionObserver,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import SearchBar from './SearchBar';
// import RecipientCard from './RecipientCard';
// import { recipients } from '../data/recipients';

// const MotionBox = motion(Box);

// const ITEMS_PER_PAGE = 12;

// function HomePage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
//   const [loading, setLoading] = useState(false);

//   const filteredRecipients = recipients.filter(recipient => {
//     const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === '' || recipient.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const loadMoreRef = React.useRef();
//   const entry = useIntersectionObserver(loadMoreRef, {});
//   const isVisible = !!entry?.isIntersecting;

//   useEffect(() => {
//     if (isVisible && displayedItems < filteredRecipients.length) {
//       setLoading(true);
//       setTimeout(() => {
//         setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredRecipients.length));
//         setLoading(false);
//       }, 500);
//     }
//   }, [isVisible, filteredRecipients.length]);

//   const displayedRecipients = filteredRecipients.slice(0, displayedItems);

//   return (
//     <Container maxW="container.xl" py={4}>
//       <SearchBar 
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         onCategoryChange={setSelectedCategory}
//       />
//       <Box 
//         mt={6} 
//         display="grid" 
//         gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" 
//         gap={6}
//         pb={24}
//       >
//         {displayedRecipients.map((recipient, index) => (
//           <MotionBox
//             key={recipient.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index % ITEMS_PER_PAGE * 0.1 }}
//           >
//             <RecipientCard recipient={recipient} />
//           </MotionBox>
//         ))}
//       </Box>
      
//       <VStack ref={loadMoreRef} py={8} spacing={4}>
//         {loading && (
//           <Spinner 
//             size="lg" 
//             color="blue.500" 
//             thickness="3px"
//           />
//         )}
//         {displayedItems >= filteredRecipients.length && (
//           <Text color="gray.500" fontSize="sm">
//             No more recipients to load
//           </Text>
//         )}
//       </VStack>
//     </Container>
//   );
// }

// export default HomePage; 