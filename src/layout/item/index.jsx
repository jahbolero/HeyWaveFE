// styling
import styles from './style.module.scss';

// components
import ZoomViewer from '@components/ZoomViewer';
import StyledTabs from '@ui/StyledTabs';
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import Like from '@ui/Like';
import BidsHistory from '@components/BidsHistory';
import Countdown from 'react-countdown';
import Sticky from 'react-stickynode';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';
import {useRef} from 'react';
import {useWindowSize} from 'react-use';

// utils
import dayjs from 'dayjs';

// assets
import product from '@assets/item/p3.jpg';
import productZoom from '@assets/item/p3.jpg';
import creator from '@assets/item/creator.webp';
import collection from '@assets/item/collection.webp';

// data placeholder
import item from '@db/item';

const Table = () => {
    return (
        <table className={styles.table}>
            <tbody>
            <tr>
                <td className="text-bold text-accent">Owner</td>
                <td className="text-overflow">{item.details.owner}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Background</td>
                <td className="text-overflow">{item.details.background}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Blockchain</td>
                <td className="text-overflow">{item.details.blockchain}</td>
            </tr>
            <tr>
                <td className="text-bold text-accent">Category</td>
                <td className="text-overflow">{item.details.category}</td>
            </tr>
            </tbody>
        </table>
    )
}

const ItemDetails = ({ itemData }) => {
    const {openBidModal} = useBidModalContext();
    const activeBids = item.bids.filter(item => item.active);
    const prevBids = item.bids.filter(item => !item.active);
    const date = useRef(dayjs().add(7, 'days').toDate());
    const isSticky = useWindowSize().width >= 768;

    // Use default product image if no itemData is provided
    const displayImage = itemData?.zoomImage || product;
    const displayTitle = itemData?.title || "Manny Pacquiao Sparring Session";

    const tabs = [
        {label: 'Waves', key: 'item-1', children: <BidsHistory data={activeBids} active/>},
        {label: 'History', key: 'item-2', children: <BidsHistory data={prevBids}/>}
    ];

    return (
        <section className={styles.details}>
            <div className={`${styles.details_container} container`}>
                <Sticky enabled={isSticky} top={60} bottomBoundary="#item_main">
                    <div className="media square border-10">
                        <ZoomViewer 
                            originalImg={displayImage}
                            zoomedImg={displayImage}
                            alt={displayTitle}
                        />
                    </div>
                </Sticky>
                <div className={styles.main} id="item_main" style={{marginTop: '-2em'}}>
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            <Countdown date={date.current}
                                       renderer={({days, hours, minutes, seconds}) => {
                                           return <span className="h6">🔥 {days}d {hours}h {minutes}m {seconds}s</span>;
                                       }}/>
                            <h2 className={styles.title}>{displayTitle}</h2>
                            <div className={styles.bid}>
                                <div className="d-flex g-10">
                                    Highest Wave <span className="text-accent text-bold">2 TON</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Like className={`${styles.btn} ${styles.like} btn btn--icon`} count={item.likes}/>
                            <button className={`${styles.btn} btn btn--icon`} aria-label="Menu">
                                <i className="icon icon-ellipsis"/>
                            </button>
                        </div>
                    </div>
                    <br></br>
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs}/>
                        <div className={styles.buttons}>
                            <GradientBtn tag="button" onClick={openBidModal}>WAVE</GradientBtn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ItemDetails