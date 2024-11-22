// hooks
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

// components
import GradientBtn from '@ui/GradientBtn';
import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';

// utils
import classNames from 'classnames';
import styles from './style.module.scss';

const PostDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        if (!file) {
            toast.error('Please upload an image');
            return;
        }
        const datetime = `${data.date}T${data.time}`;
        console.log('Form data:', { ...data, datetime, image: file });
        toast.success('Post created successfully!');
        navigate('/author');
    };

    return (
        <div className={`${styles.wrapper} border-10`}>
            <form className="d-flex flex-column g-40" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column g-20">
                    <div className={styles.group}>
                        <input 
                            className={classNames('field field--outline', {'field--error': errors.title})}
                            type="text"
                            placeholder="Post Title"
                            {...register('title', {required: true})}
                        />
                        {errors.title && <span className="error">Title is required</span>}
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Minimum Wave (TON)</label>
                        <input 
                            className={classNames('field field--outline', {'field--error': errors.waveAmount})}
                            type="number"
                            min="0"
                            placeholder="Enter amount"
                            {...register('waveAmount', {
                                required: true,
                                min: 0,
                                pattern: /^[0-9]*$/
                            })}
                        />
                        {errors.waveAmount && <span className="error">Please enter a valid wave amount</span>}
                    </div>

                    <div className={styles.dateTimeGroup}>
                        <div className={styles.group}>
                            <label className={styles.label}>Date</label>
                            <input 
                                className={classNames('field field--outline', {'field--error': errors.date})}
                                type="date"
                                {...register('date', {
                                    required: true,
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const now = new Date();
                                        now.setHours(0, 0, 0, 0);
                                        return selectedDate >= now || "Date must be today or in the future";
                                    }
                                })}
                            />
                            {errors.date && <span className="error">
                                {typeof errors.date.message === 'string' 
                                    ? errors.date.message 
                                    : 'Please select a valid date'}
                            </span>}
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Time</label>
                            <input 
                                className={classNames('field field--outline', {'field--error': errors.time})}
                                type="time"
                                {...register('time', {required: true})}
                            />
                            {errors.time && <span className="error">Please select a time</span>}
                        </div>
                    </div>
                    
                    <textarea 
                        className={`${styles.textarea} field field--outline`} 
                        placeholder="Post Content"
                        {...register('content', {required: true})} 
                    />
                </div>
                <div className={styles.imageUpload}>
                    <h5>Post Image</h5>
                    {file && (
                        <div className={styles.preview}>
                            <LazyImage src={file} alt="Preview" />
                        </div>
                    )}
                    <div className="d-flex g-10">
                        <GradientBtn 
                            tag="button" 
                            type="button" 
                            onClick={() => inputRef.current?.click()}
                        >
                            Upload Image
                        </GradientBtn>
                        {file && (
                            <button 
                                type="button" 
                                className="btn btn--outline"
                                onClick={() => setFile(null)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <input 
                        type="file" 
                        hidden 
                        ref={inputRef} 
                        onChange={handleFile}
                        accept="image/*"
                    />
                </div>
                <div className={styles.buttons}>
                    <GradientBtn tag="button" type="submit">Create Event</GradientBtn>
                    <button 
                        type="button" 
                        className="btn btn--outline"
                        onClick={() => navigate('/author')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostDetails; 