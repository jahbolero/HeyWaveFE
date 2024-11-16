import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BottomMenu from './components/BottomMenu';    import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (

    <Router>
      <Box minH="100vh">
      <TonConnectUIProvider manifestUrl="https://<YOUR_APP_URL>/tonconnect-manifest.json">
            { /* Your app */ }
        </TonConnectUIProvider>
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
