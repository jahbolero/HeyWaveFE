import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '@components/Title';
import AuthorCard from '@layout/author/AuthorCard';
import AuthorItems from '@layout/author/AuthorItems';
import FooterNav from '@components/FooterNav';
import { userService } from '../services/UserService.ts';
import { serviceService } from '../services/ServiceService.ts';
import { useTonConnect } from '../hooks/useTonConnect.ts';

const Author = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [userServices, setUserServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { address } = useTonConnect();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await userService.getUserById(address);
                const services = await serviceService.getServicesByUser(address);
                alert(JSON.stringify(services))
                setUserData(user);
                setUserServices(services);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Title title="Profile"/>
            <main>
                <AuthorCard userData={userData} />
                <AuthorItems services={userServices} />
                <FooterNav />
            </main>
        </>
    );
};

export default Author;