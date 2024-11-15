import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BottomMenu from './components/BottomMenu';

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
        <BottomMenu />
      </Box>
    </Router>
  );
}

export default App;
