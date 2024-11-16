// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import Checkbox from '@ui/Checkbox';
import GradientBtn from '@ui/GradientBtn';
import {LoginSocialGoogle, LoginSocialFacebook} from 'reactjs-social-login';
import {toast} from 'react-toastify';

// hooks
import {useAuth} from '@contexts/authContext';
import {useNavigate} from 'react-router-dom';

// assets
import google from '@assets/google.svg';
import facebook from '@assets/facebook.svg';
import login from '@assets/login.webp';

const LoginForm = ({setIsModalVisible}) => {
    const {setIsLogged} = useAuth();
    const navigate = useNavigate();

    const handleModal = e => {
        e.preventDefault();
        setIsModalVisible(true);
    }

    const handleReject = (err) => {
        toast.error(err);
    }

    const handleResolve = () => {
        setIsLogged(true);
        navigate('/profile');
    }

    return (
        <div className={`${styles.container} border-10`}>
            <div className={styles.main}>
                <h3>Login to your account</h3>
                <div className={styles.main_socials}>
                    <span className="text-light text-bold">Sign in with social</span>
                    <div className={styles.options}>
                        <LoginSocialGoogle client_id={process.env.REACT_APP_GG_APP_ID}
                                           onReject={handleReject}
                                           onResolve={handleResolve}
                                           className={`${styles.options_item} field bg-tertiary text-light`}>
                            <LazyImage className={styles.icon} src={google} alt="google" effect="opacity"/>
                            <span className="text-sm">Sign in with Google</span>
                        </LoginSocialGoogle>
                        <LoginSocialFacebook appId={process.env.REACT_APP_FB_APP_ID}
                                             onReject={handleReject}
                                             onResolve={handleResolve}
                                             className={`${styles.options_item} field bg-tertiary text-light`}>
                            <LazyImage className={styles.icon} src={facebook} alt="facebook" effect="opacity"/>
                            <span className="text-sm">Sign in with Facebook</span>
                        </LoginSocialFacebook>
                    </div>
                </div>
                <div className={styles.main_form}>
                    <span className="main_form-title text-light text-bold">Or sign in with e-mail</span>
                    <form className="main_form-form d-flex flex-column g-20">
                        <input className="field field--outline"
                               type="text"
                               placeholder="Email"/>
                        <input className="field field--outline"
                               type="password"
                               placeholder="Password"
                               autoComplete="new-password"/>
                        <div className="d-flex flex-wrap g-15 align-items-center justify-content-between">
                            <div className="d-flex align-items-center g-10 text-light text-sm">
                                <Checkbox id="remember"/>
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <button className={`${styles.remind} text-sm`} id="remind-password" onClick={handleModal}>
                                Forgot password?
                            </button>
                        </div>
                        <GradientBtn className={styles.btn} tag="button" type="submit">Login</GradientBtn>
                    </form>
                </div>
            </div>
            <div className={`${styles.media} border-10`}>
                <LazyImage className={styles.media_img} src={login} alt="media"/>
            </div>
        </div>
    )
}

export default LoginForm