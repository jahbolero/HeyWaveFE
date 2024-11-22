// utils
import {lazy} from 'react';

// components
import Title from '@components/Title';
import Hero from '@layout/home/Hero';
import FooterNav from '@components/FooterNav';

const BestSellers = lazy(() => import('@layout/home/BestSellers'));
const Blog = lazy(() => import('@layout/home/Blog'));

const Home = () => {
    return (
        <>
            <Title title="Home"/>
            <main>
                <Hero/>
                <BestSellers/>
                <Blog/>
                <FooterNav />
            </main>
        </>
    )
}

export default Home