import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from '@pages/CreateEvent';
import Author from '@pages/Author';
import Activity from '@pages/Activity';
import AppLayout from '@components/AppLayout';

const App = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Activity />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/author" element={<Author />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};

export default App; 