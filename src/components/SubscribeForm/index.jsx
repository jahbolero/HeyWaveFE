// styling
import styles from './style.module.scss';

// components
import {toast} from 'react-toastify';

// hooks
import {useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

const SubscribeForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = () => {
        toast.info('Thank you for subscribing!');
        reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={classNames('field bg-tertiary border-10 text-bold', {'field--error': errors.email})}
                   type="text"
                   placeholder="Email here..."
                   {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
            <button type="submit" aria-label="Subscribe to the newsletter">
                <i className="icon icon-arrow-right"/>
            </button>
        </form>
    )
}

export default SubscribeForm