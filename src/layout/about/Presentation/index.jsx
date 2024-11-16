// styling
import styles from './style.module.scss';

// components
import Video from '@components/Video';
import GradientBtn from '@ui/GradientBtn';
import Spring from '@components/Spring';

// assets
import cover from '@assets/about/cover.webp';

const Presentation = () => {
    return (
        <section>
            <div className={`${styles.container} container`}>
                <Video cover={cover}/>
                <Spring delay={350}>
                    <div className={`${styles.main} border-hover`}>
                        <h3>Our mission</h3>
                        <p className={styles.main_text}>
                            Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur.
                        </p>
                        <GradientBtn className={styles.main_btn} href="/blog-sidebar">See our blog</GradientBtn>
                    </div>
                </Spring>
            </div>
        </section>
    )
}

export default Presentation