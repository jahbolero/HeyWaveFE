// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import FooterNav from '@components/FooterNav';
import GradientBtn from '@ui/GradientBtn';
import StyledProgress from '@ui/StyledProgress';
import LazyImage from '@components/LazyImage';
import { toast } from 'react-toastify';

// hooks
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// utils
import classNames from 'classnames';

const CreateEvent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result);
                setLoading(false);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const triggerInput = () => inputRef.current?.click();

    const onSubmit = (data) => {
        if (!file) {
            toast.error('Please upload an image');
            return;
        }
        console.log('Form submitted:', { ...data, image: file });
        toast.success('Event created successfully!');
        navigate('/author');
    };

    return (
        <>
            <Title title="Create Event"/>
            <SimplePageHeader title="Create New Event"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <div className={`${styles.wrapper} bg-secondary border-10`}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.formGroup}>
                                    <label>Event Title</label>
                                    <input 
                                        className={classNames('field field--outline', {'field--error': errors.title})}
                                        type="text"
                                        placeholder="Enter event title"
                                        {...register('title', { required: true })}
                                    />
                                    {errors.title && <span className="error">Title is required</span>}
                                </div>
                                
                                <div className={styles.imageUpload}>
                                    <h5>Event Image</h5>
                                    {file && (
                                        <div className={styles.preview}>
                                            <LazyImage src={file} alt="Preview" />
                                        </div>
                                    )}
                                    <div className="d-flex flex-column g-20">
                                        <GradientBtn tag="button" type="button" onClick={triggerInput}>
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
                                    <input type="file" ref={inputRef} onChange={handleFile} hidden accept="image/*"/>
                                    {loading && <StyledProgress visible isOverlay />}
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
                    </div>
                </div>
                <FooterNav />
            </main>
        </>
    );
};

export default CreateEvent; 