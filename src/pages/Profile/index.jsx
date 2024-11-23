// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import AvatarUpload from '@layout/profile/AvatarUpload';
import ProfileDetails from '@layout/profile/ProfileDetails';
import FooterNav from '@components/FooterNav';

import { useState, useEffect } from 'react';
import { userService } from '../../services/UserService.ts';
import { useTonConnect } from '../../hooks/useTonConnect.ts';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [existingUser, setExistingUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { address } = useTonConnect();

    // Load user data at the Profile page level
    useEffect(() => {
        const fetchUserData = async () => {
            if (!address) return;
            setIsLoading(true);
            try {
                const userData = await userService.getUserById(address);
                setExistingUser(userData);
            } catch (error) {
                console.log('No existing user found');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [address]);

    const handleImageSelect = (imageFile) => {
        setSelectedImage(imageFile);
    };

    return (
        <>
            <Title title="Profile"/>
            <SimplePageHeader title="Edit Profile"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <AvatarUpload 
                            onImageSelect={handleImageSelect} 
                            user={existingUser} 
                        />
                        <ProfileDetails 
                            user={existingUser}
                            setUser={setExistingUser}
                            isLoading={isLoading}
                            selectedImage={selectedImage}
                        />
                    </div>
                </div>
                <FooterNav />
            </main>
        </>
    );
}

export default Profile;