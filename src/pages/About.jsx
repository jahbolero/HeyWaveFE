// utils
import {lazy} from 'react';

// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import About from '@layout/about/About';
const Decoration = lazy(() => import('@layout/about/Decoration'));
const Features = lazy(() => import('@components/Features'));
const Presentation = lazy(() => import('@layout/about/Presentation'));
const Statistics = lazy(() => import('@layout/about/Statistics'));
const Team = lazy(() => import('@layout/about/Team'));
const CTA = lazy(() => import('@components/CTA'));

const AboutUs = () => {
    return (
        <>
            <Title title="About Us"/>
            <PageHeader title="About Us"/>
            <main>
                <About/>
                <Decoration/>
                <Features/>
                <Presentation/>
                <Statistics/>
                <Team/>
                <CTA/>
            </main>
        </>
    );
}

export default AboutUs