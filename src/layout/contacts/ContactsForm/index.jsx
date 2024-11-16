// styling
import styles from './style.module.scss';

// components
import GradientBtn from '@ui/GradientBtn';
import Map from '@layout/contacts/Map';
import LazyImage from '@components/LazyImage';
import {toast} from 'react-toastify';

// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

// assets
import map from '@assets/map.webp';

const ContactsForm = () => {
    const MAP_KEY = process.env.REACT_APP_PUBLIC_MAP_KEY;
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const onSubmit = () => {
        toast.info('Your message has been sent successfully');
        reset();
    }

    return (
        <div className={`${styles.container} bg-secondary border-10`}>
            <div className={styles.main}>
                <h3>Write us your message</h3>
                <form className={styles.main_form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.group}>
                        <input className={classNames('field field--outline', {'field--error': errors.name})}
                               type="text"
                               placeholder="Full name"
                               {...register('name', {required: true})}/>
                        <input className={classNames('field field--outline', {'field--error': errors.email})}
                               type="text"
                               placeholder="Email"
                               {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
                    </div>
                    <input className={classNames('field field--outline', {'field--error': errors.subject})}
                           type="text"
                           placeholder="Subject"
                           {...register('subject', {required: true})}/>
                    <textarea className={classNames('field field--outline', {'field--error': errors.message})}
                              placeholder="Enter your message"
                              {...register('message', {required: true})}/>
                    <GradientBtn className={styles.btn} tag="button" type="submit">Send message</GradientBtn>
                </form>
            </div>
            <div className={`${styles.map} border-10`}>
                {
                    MAP_KEY ?
                        <Map/>
                        :
                        <LazyImage className={`${styles.img} border-10`} src={map} alt="map"/>
                }
            </div>
        </div>
    )
}

export default ContactsForm