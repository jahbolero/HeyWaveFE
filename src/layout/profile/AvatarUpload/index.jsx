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

const AvatarUpload = ({ onImageSelect, user }) => {
    const {file, preview, setFile, setPreview, handleFile, loading} = useFileReader();
    const inputRef = useRef(null);
    const {address} = useTonConnect();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user?.image_url) {
            setPreview(user.image_url);
        } else {
            setPreview(avatar);
        }
    }, [user, setPreview]);

    const triggerInput = () => inputRef.current?.click();

    const handleDelete = () => {
        setPreview(avatar);
        setFile(null);
        onImageSelect(null);
    }

    const handleFileChange = (e) => {
        const selectedFile = handleFile(e);
        if (selectedFile) {
            onImageSelect(selectedFile);
        }
    };

    return (
        <div className={`${styles.wrapper} bg-secondary border-10`}>
            <div className={styles.content}>
                <div className={styles.content_avatar}>
                    <Avatar className={styles.container} src={preview} alt="avatar"/>
                    {loading && <StyledProgress visible isOverlay isRound />}
                </div>
                <div className="d-flex flex-column g-20">
                    <GradientBtn tag="button" onClick={triggerInput}>
                        Upload photo
                    </GradientBtn>
                    <button 
                        className="btn btn--outline" 
                        onClick={handleDelete} 
                        disabled={!user?.image_url}
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