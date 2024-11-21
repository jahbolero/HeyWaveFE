// styling
import styles from './style.module.scss';

// components
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import {toast} from 'react-toastify';

// hooks
import {useRef, useState, useEffect} from 'react';
import useFileReader from '@hooks/useFileReader';
import {useTonConnect} from '../../../hooks/useTonConnect.ts';
import { userService } from '../../../services/UserService.ts';

// assets
import avatar from '@assets/avatar.webp';
import placeholder from '@assets/avatar_placeholder.webp';

const AvatarUpload = ({ onImageUpload, user }) => {
    const {file, preview, setFile, setPreview, handleFile, loading} = useFileReader();
    const inputRef = useRef(null);
    const {address} = useTonConnect();
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const loadUserImage = async () => {
            if (address && !user) {
                try {
                    const userData = await userService.getUserById(address);
                    if (userData?.image_url) {
                        setPreview(userData.image_url);
                    } else {
                        setPreview(avatar);
                    }
                } catch (error) {
                    console.error('Failed to load user image:', error);
                    setPreview(avatar);
                }
            } else if (user?.image_url) {
                setPreview(user.image_url);
            } else {
                setPreview(avatar);
            }
        };

        loadUserImage();
    }, [address, user, setPreview]);

    const triggerInput = () => inputRef.current?.click();

    const handleDelete = async () => {
        try {
            if (address) {
                await userService.updateProfileImage(address, null);
                setPreview(avatar);  // Reset to default avatar after delete
                setFile(null);
                toast.info('Your profile picture was successfully deleted.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete image');
        }
    }

    const handleFileChange = async (e) => {
        const selectedFile = handleFile(e);
        if (selectedFile && address) {
            setIsUploading(true);
            try {
                await onImageUpload(selectedFile, address);
                toast.success('Profile image uploaded successfully!');
            } catch (error) {
                console.error('Upload error:', error);
                toast.error('Failed to upload image');
                setFile(null);
                setPreview(user?.image_url || avatar);  // Reset to previous image on error
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className={`${styles.wrapper} bg-secondary border-10`}>
            <div className={styles.content}>
                <div className={styles.content_avatar}>
                    <Avatar className={styles.container} src={preview} alt="avatar"/>
                    {(loading || isUploading) && <StyledProgress visible isOverlay isRound />}
                </div>
                <div className="d-flex flex-column g-20">
                    <GradientBtn tag="button" onClick={triggerInput} disabled={isUploading}>
                        Upload photo
                    </GradientBtn>
                    <button 
                        className="btn btn--outline" 
                        onClick={handleDelete} 
                        disabled={!user?.image_url || isUploading}
                    >
                        Delete
                    </button>
                </div>
                <input 
                    type="file" 
                    ref={inputRef} 
                    onChange={handleFileChange} 
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                />
            </div>
        </div>
    )
}

export default AvatarUpload;