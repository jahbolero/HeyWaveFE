import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serviceService } from '../../../services/ServiceService.ts';
import { bidService } from '../../../services/BidService.ts';
import styles from './style.module.scss';
import ZoomViewer from '@components/ZoomViewer';
import StyledTabs from '@ui/StyledTabs';
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import Like from '@ui/Like';
import BidsHistory from '@components/BidsHistory';
import Countdown from 'react-countdown';
import Sticky from 'react-stickynode';
import BidModal from '@components/BidModal';
import { useWindowSize } from 'react-use';
import dayjs from 'dayjs';

const Item = () => {
    const location = useLocation();
    const itemData = location.state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isSticky = useWindowSize().width >= 768;
    const [serviceDetails, setServiceDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                if (itemData?.serviceId) {
                    const service = await serviceService.getServiceById(itemData.serviceId);
                    const bids = await bidService.getBidsByService(itemData.serviceId);
                    
                    setServiceDetails({
                        ...service,
                        author: {
                            name: service.users.username,
                            avatar: service.users.image_url,
                            isVerified: true
                        },
                        highest_bid: service.highest_bid,
                        minimum_bid: service.minimum_bid,
                        deadline: service.deadline,
                        likes_count: service.likes_count,
                        is_liked: service.is_liked,
                        bids: bids || []
                    });
                } else {
                    setServiceDetails(itemData);
                }
            } catch (error) {
                console.error('Failed to fetch service details: ' + error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceDetails();
    }, [itemData]);

    if (isLoading) {
        return <div className="container">Loading...</div>;
    }

    const displayData = serviceDetails || {
        service_url: '',
        name: '',
        author: { name: '', avatar: '' },
        highest_bid: 0,
        minimum_bid: 0,
        likes_count: 0,
        bids: []
    };

    const activeBids = displayData.bids.filter(bid => bid.active) || [];
    const prevBids = displayData.bids.filter(bid => !bid.active) || [];

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
                            originalImg={displayData.service_url}
                            zoomedImg={displayData.service_url}
                            alt={displayData.name}
                        />
                    </div>
                </Sticky>
                <div className={styles.main} id="item_main">
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {displayData.deadline && (
                                <Countdown 
                                    date={dayjs(displayData.deadline).valueOf()}
                                    renderer={({days, hours, minutes, seconds}) => (
                                        <span className="h6">🔥 {days}d {hours}h {minutes}m {seconds}s</span>
                                    )}
                                />
                            )}
                            <h2 className={styles.title}>{displayData.name}</h2>
                            <div className={styles.creator}>
                                <Avatar 
                                    src={displayData.author.avatar}
                                    alt={displayData.author.name}
                                    isVerified={true}
                                />
                                <span>@{displayData.author.name}</span>
                            </div>
                            <div className={styles.bid}>
                                <div className="d-flex g-10">
                                    Highest Wave <span className="text-accent text-bold">{displayData.highest_bid} TON</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Like 
                                className={`${styles.btn} ${styles.like} btn btn--icon`} 
                                count={displayData.likes_count}
                                isLiked={displayData.is_liked}
                            />
                            <button className={`${styles.btn} btn btn--icon`} aria-label="Menu">
                                <i className="icon icon-ellipsis"/>
                            </button>
                        </div>
                    </div>
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs}/>
                        <div className={styles.buttons}>
                            <GradientBtn 
                                tag="button" 
                                onClick={() => setIsModalOpen(true)}
                            >
                                WAVE
                            </GradientBtn>
                        </div>
                    </div>
                </div>
            </div>
            <BidModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={displayData}
            />
        </section>
    );
}

export default Item; 

//UNUSED?