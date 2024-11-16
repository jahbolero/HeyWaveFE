// styling
import styles from './style.module.scss';

// components
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Spring from '@components/Spring';

// utils
import {formatNumber} from '@utils/helpers';

// assets
import cube from '@assets/about/cube.webp';
import shape from '@assets/about/shape.svg';

const Statistics = () => {
    const data = [
        {num: 250, label: 'All NFT\'s'},
        {num: 3543, label: 'All creators'},
        {num: 1000, label: 'Collections'},
        {num: 490, label: 'Level one seller'},
    ];

    return (
        <section className={styles.section}>
            <img className={styles.cube} src={cube} alt="media" width={562} height={544}/>
            <img className={styles.shape} src={shape} alt="media"/>
            <div className={`${styles.container} container`}>
                <div className="d-flex flex-column g-10">
                    <h3>HeyWave statistics</h3>
                    <p>
                        Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                    </p>
                </div>
                <div className={styles.main}>
                    {
                        data.map((item, index) => (
                            <Spring key={index} index={index}>
                                <div className={`${styles.main_item} d-flex flex-column g-10 border-10 bg-secondary`}>
                                    <CountUp end={item.num}
                                             duration={3}
                                             formattingFn={formatNumber}>
                                        {({countUpRef, start}) => (
                                            <VisibilitySensor onChange={start} delayedCall>
                                                <span className={`${styles.num} h1`} ref={countUpRef}/>
                                            </VisibilitySensor>
                                        )}
                                    </CountUp>
                                    <p className="h6">{item.label}</p>
                                </div>
                            </Spring>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Statistics