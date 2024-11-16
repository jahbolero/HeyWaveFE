import { Routes, Route } from 'react-router-dom';
import Explore from '@pages/Explore/index';
import FooterNav from '@components/FooterNav';

function App() {
    return (
        <>
            <Routes>
                <Route path="/explore" element={<Explore />} />
                {/* other routes */}
            </Routes>
            <FooterNav />
        </>
    );
}

export default App; 