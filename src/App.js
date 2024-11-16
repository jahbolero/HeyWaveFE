// GA
import ReactGA from 'react-ga4';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// styling
import './style.scss';

// libs styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'react-toastify/dist/ReactToastify.css';

// utils
import {lazy, Suspense} from 'react';
import {preventDefault} from '@utils/helpers';

// hooks
import {useEffect} from 'react';

// context
import {BidModalContextAPI} from '@contexts/bidModalContext';
import {SidebarContextAPI} from '@contexts/sidebarContext';
import {AuthAPI} from '@contexts/authContext';

// components
import LoadingScreen from '@components/LoadingScreen';
import AppLayout from '@components/AppLayout';
import {Routes, Route} from 'react-router-dom';
import ScrollToTop from '@components/ScrollToTop';

// pages
const Home = lazy(() => import('@pages/Home'));
const Explore = lazy(() => import('@pages/Explore'));
const ExploreGrid = lazy(() => import('@pages/ExploreGrid'));
const Item = lazy(() => import('@pages/Item'));
const Author = lazy(() => import('@pages/Author'));
const Profile = lazy(() => import('@pages/Profile'));
const FAQ = lazy(() => import('@pages/FAQ'));
const Ranking = lazy(() => import('@pages/Ranking'));
const Activity = lazy(() => import('@pages/Activity'));
const ConnectWallet = lazy(() => import('@pages/ConnectWallet'));
const Login = lazy(() => import('@pages/Login'));
const About = lazy(() => import('@pages/About'));
const Team = lazy(() => import('@pages/Team'));
const BlogSidebar = lazy(() => import('@pages/BlogSidebar'));
const BlogGrid = lazy(() => import('@pages/BlogGrid'));
const Post = lazy(() => import('@pages/Post'));
const Contacts = lazy(() => import('@pages/Contacts'));
const PageNotFound = lazy(() => import('@pages/PageNotFound'));

const App = () => {
    useEffect(() => {
        preventDefault();
    }, []);

    const gaKey = process.env.REACT_APP_PUBLIC_GA;
    gaKey && ReactGA.initialize(gaKey);

    return (
        <TonConnectUIProvider manifestUrl="https://hey-wave-fe.vercel.app/tonconnect-manifest.json">
        <AuthAPI>
            <BidModalContextAPI>
                <SidebarContextAPI>
                    <ScrollToTop/>
                    <AppLayout>
                        <Suspense fallback={<LoadingScreen visible/>}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/explore" element={<Explore/>}/>
                                <Route path="/explore-grid" element={<ExploreGrid/>}/>
                                <Route path="/explore/item" element={<Item/>}/>
                                <Route path="/author" element={<Author/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/faq" element={<FAQ/>}/>
                                <Route path="/ranking" element={<Ranking/>}/>
                                <Route path="/activity" element={<Activity/>}/>
                                <Route path="/connect-wallet" element={<ConnectWallet/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/team" element={<Team/>}/>
                                <Route path="/blog-sidebar" element={<BlogSidebar/>}/>
                                <Route path="/blog-grid" element={<BlogGrid/>}/>
                                <Route path="/post" element={<Post/>}/>
                                <Route path="/contacts" element={<Contacts/>}/>
                                <Route path="*" element={<PageNotFound/>}/>
                            </Routes>
                        </Suspense>
                    </AppLayout>
                </SidebarContextAPI>
            </BidModalContextAPI>
        </AuthAPI>
        </TonConnectUIProvider>
    )
}

export default App
