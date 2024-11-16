import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BottomMenu from './components/BottomMenu';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (

  
      <TonConnectUIProvider manifestUrl="https://hey-wave-fe.vercel.app/tonconnect-manifest.json">
        <Router>
        <Box minH="100vh">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
        <BottomMenu />
      </Box>
    </Router>
        </TonConnectUIProvider>

    

  );
}

export default App;
