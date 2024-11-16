// styling
import styles from './style.module.scss';

// components
import Ticker from '@components/Ticker';
import LazyImage from '@components/LazyImage';

// assets
import wave from '@assets/about/tickerbg.svg';

const Decoration = () => {
    return (
        <div className={`${styles.container} section`}>
            <LazyImage className={styles.wave} src={wave} alt="media" effect="opacity" />
            <Ticker text="the new creative economy" />
        </div>
    )
}

export default Decoration