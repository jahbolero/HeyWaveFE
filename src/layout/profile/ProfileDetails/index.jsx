// styling
import styles from './style.module.scss';

// components
import {toast} from 'react-toastify';
import GradientBtn from '@ui/GradientBtn';

// hooks
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import useFileReader from '@hooks/useFileReader';
import {useTonConnect} from '../../../hooks/useTonConnect.ts';
import {userService} from '../../../services/UserService.ts';

// utils
import classNames from 'classnames';

// Add this import at the top
import { NavLink } from 'react-router-dom';

const ProfileDetails = ({ user, setUser, isLoading }) => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const {file, setFile, handleFile, loading} = useFileReader();
    const inputRef = useRef(null);
    const {address} = useTonConnect();

    const triggerInput = () => inputRef.current?.click();

    const onSubmit = async (data) => {
        if (!address) {
            toast.error('Please connect your address first');
            return;
        }

        try {
            const userData = {
                username: data.userName
            };

            if (user) {
                await userService.updateUser(address, userData);
            } else {
                await userService.createUser({
                    address: address,
                    ...userData
                });
            }
            
            toast.success('Profile updated successfully!');
            const updatedUser = await userService.getUserById(address);
            setUser(updatedUser);
        } catch (error) {
            toast.error(error.message || 'Failed to save profile');
        }
    };

    useEffect(() => {
        if (user?.username) {
            setValue('userName', user.username);
        }
    }, [user, setValue]);

    return (
        <div className={`${styles.wrapper} border-10`}>
            {isLoading ? (
                <div className="d-flex flex-column g-20">
                    <p>Loading...</p>
                </div>
            ) : (
                <form className="d-flex flex-column g-40" onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-column g-20">
                        <div className={styles.group}>
                            <input 
                                className={classNames('field field--outline', {'field--error': errors.userName})}
                                type="text"
                                placeholder="Username"
                                {...register('userName', {required: true})}
                            />
                        </div>
                        <input 
                            className={classNames('field field--outline', {'field--error': errors.url})}
                            type="text"
                            placeholder="Custom URL"
                            {...register('url', {
                                required: false,
                                pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
                            })} 
                        />
                        <textarea 
                            className={`${styles.textarea} field field--outline`} 
                            placeholder="Enter your bio"
                            {...register('bio', {required: false})} 
                        />
                    </div>
                    <div className={styles.buttons}>
                        <GradientBtn tag="button" type="submit">Update profile</GradientBtn>
                        <NavLink to="/author" className="btn btn--outline">
                            Preview
                        </NavLink>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileDetails;