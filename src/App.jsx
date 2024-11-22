import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from '@pages/CreateEvent';
import Author from '@pages/Author';
import Activity from '@pages/Activity';
import Post from '@pages/Post';
import AppLayout from '@components/AppLayout';
import Explore from '@pages/Explore';
import Item from '@pages/Explore/item';
import ServiceDetails from './pages/Explore/ServiceDetails';

const App = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Activity />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/author/:userId" element={<Author />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/explore/item" element={<Item />} />
                    <Route path="/explore/item/:serviceId" element={<ServiceDetails />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};

export default App; 