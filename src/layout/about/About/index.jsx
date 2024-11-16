// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// hooks
import {useWindowSize} from 'react-use';

// assets
import main from '@assets/about/about_main.webp';
import secondary from '@assets/about/about_secondary.webp';
import ball from '@assets/about/ball.webp';
import ring from '@assets/about/ring.webp';
import wave from '@assets/about/wave.webp';

const About = () => {
    const {width} = useWindowSize();

    return (
        <section>
            <div className={`${styles.container} container`}>
                <div className={styles.media}>
                    <LazyImage className={`${styles.media_img} border-10`} src={main} alt="media"/>
                    {
                        width >= 1024 &&
                        <div className={styles.media_wrapper}>
                            <div>
                                <LazyImage className={styles.wave} src={wave} alt="wave" effect="opacity"/>
                            </div>
                            <div>
                                <LazyImage className={styles.ball} src={ball} alt="ball" effect="opacity"/>
                            </div>
                            <div>
                                <LazyImage className={styles.ring} src={ring} alt="ring" effect="opacity"/>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.main}>
                    <LazyImage className={`${styles.main_img} border-10`} src={secondary} alt="media"/>
                    <Spring className={styles.wrapper} delay={300}>
                        <span className={`${styles.main_emoji} h3`}>🔥🔥🔥</span>
                        <h3>Who we are?</h3>
                        <p className={styles.main_text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <span className={styles.main_divider}/>
                    </Spring>
                </div>
            </div>
        </section>
    )
}

export default About