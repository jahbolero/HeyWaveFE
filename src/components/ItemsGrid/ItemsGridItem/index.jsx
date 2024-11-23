// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import {NavLink} from 'react-router-dom';
import Countdown from 'react-countdown';
import Avatar from '@ui/Avatar';
import Like from '@ui/Like';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';
import { useTonConnect } from '../../../hooks/useTonConnect.ts';



const ItemsGridItem = ({item, isPrivate, index}) => {
    const {
        id,
        title, 
        image, 
        author,
        highest_bid,
        minimum_bid,
        deadline,
        likes_count = 0,
        is_liked = false,
        status,
        users,
        service_url
    } = item;
    const {address} = useTonConnect();
    const {openBidModal} = useBidModalContext();
    const handleCloseEvent = () => {
        console.log('Event closed:', item);
    };

    const renderButton = () => {
        if (isPrivate) {
            return (
                <div className="d-flex justify-content-end w-100">
                    <button 
                        className="btn btn--outline btn--sm"
                        onClick={handleCloseEvent}
                    >
                        Close Event
                    </button>
                </div>
            );
        }
        
        return (
            <div className="d-flex justify-content-between w-100">
                <button 
                    className={`${styles.main_btn} text-accent text-sm link-hover link-hover--invert`}
                    onClick={openBidModal}
                >
                    Wave
                </button>
                <Like count={likes_count} isLiked={is_liked}/>
            </div>
        );
    };

    return (
        <Spring index={index}>
            <div className={`${styles.wrapper} border-hover bg-primary`}>
                <div className="author d-flex align-items-center g-10">
                    <Avatar 
                        src={users.image_url} 
                        alt={users.username} 
                        size="xs" 
                        isVerified={true} 
                    />
                    <NavLink 
                        className="text-sm text-bold text-light link-hover link-hover--invert"
                        to="/author"
                        style={{pointerEvents: isPrivate ? 'none' : 'auto'}}
                    >
                        @{users.username}
                    </NavLink>
                </div>
                <NavLink 
                    to="/explore/item"
                    state={{ 
                        serviceId: id,
                        zoomImage: service_url,
                        title: title,
                        author: author,
                        highest_bid: highest_bid,
                        minimum_bid: minimum_bid,
                        deadline: deadline,
                        likes_count: likes_count,
                        is_liked: is_liked
                    }}
                >
                    <div className={`${styles.media} square border-10`}>
                        <LazyImage src={service_url} alt={title} />
                    </div>
                </NavLink>
                <div className={styles.main}>
                    <div className="d-flex align-items-center justify-content-between g-10">
                        <NavLink 
                            className="h6 text-overflow link-hover" 
                            to="/explore/item"
                            state={{ 
                                serviceId: id,
                                zoomImage: image,
                                title: title,
                                author: author,
                                highest_bid: highest_bid,
                                minimum_bid: minimum_bid,
                                deadline: deadline,
                                likes_count: likes_count,
                                is_liked: is_liked
                            }}
                        >
                            {title}
                        </NavLink>
                        <button aria-label="Menu">
                            <i className="icon icon-ellipsis"></i>
                        </button>
                    </div>
                    <div className={`${styles.main_price} text-sm text-bold`}>
                        <div className="d-flex flex-column g-5">
                            {highest_bid && (
                                <div className="d-flex g-10">
                                    <span className="text-accent">Highest Wave:{highest_bid} TON</span>
                                </div>
                            )}
                            {minimum_bid && (
                                <div className="d-flex g-10">
                                    <span className="text-light">Min bid: {minimum_bid} TON</span>
                                </div>
                            )}
                        </div>
                        {
                            !isPrivate && deadline &&
                            <Countdown 
                                date={dayjs(deadline).valueOf()}
                                renderer={({days, hours, minutes}) => {
                                    return <span className="text-sm text-light">
                                        🔥 {days}d {hours}h {minutes}m
                                    </span>;
                                }}
                            />
                        }
                    </div>
                    <div className="d-flex justify-content-between">
                        {!isPrivate && status === 0 && (
                            <button 
                                className={`${styles.main_btn} text-accent text-sm link-hover link-hover--invert`}
                                onClick={openBidModal}
                            >
                                Wave
                            </button>
                        )}
                        <Like count={likes_count} isLiked={is_liked}/>
                    </div>
                </div>
            </div>
        </Spring>
    )
}

export default ItemsGridItem