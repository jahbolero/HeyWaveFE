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
import BidModal from '@components/BidModal';

// hooks
import {useRef, useState, useEffect} from 'react';
import {useWindowSize} from 'react-use';
import {useLocation} from 'react-router-dom';
import { serviceService } from '../../services/ServiceService.ts';
import { bidService } from '../../services/BidService.ts';
import { useTonConnect } from '../../hooks/useTonConnect.ts';
import { userService } from '../../services/UserService.ts';

// utils
import dayjs from 'dayjs';

const ItemDetails = ({ serviceId, itemData = {} }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isSticky = useWindowSize().width >= 768;
    const [serviceDetails, setServiceDetails] = useState(null);
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { address } = useTonConnect();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (address) {
                    const user = await userService.getUserById(address);
                    setUserData(user);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, [address]);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                if (serviceId) {
                    const service = await serviceService.getServiceById(serviceId);
                    const fetchedBids = await bidService.getBidsByService(serviceId);
                    setBids(fetchedBids || []);
                    setServiceDetails({
                        ...service,
                        author: {
                            name: service.users.username,
                            avatar: service.users.image_url,
                            isVerified: true
                        },
                        highest_bid: service.highest_bid_amount,
                        minimum_bid: service.minimum_bid,
                        deadline: service.deadline,
                        likes_count: service.likes_count,
                        is_liked: service.is_liked
                    });
                } else if (itemData.zoomImage) {
                    const services = await serviceService.getActiveServices();
                    const service = services.find(s => s.id === itemData.serviceId);
                    if (service) {
                        const fetchedBids = await bidService.getBidsByService(service.id);
                        setBids(fetchedBids || []);
                        setServiceDetails({
                            ...service,
                            author: {
                                name: service.users.username,
                                avatar: service.users.image_url,
                                isVerified: true
                            },
                            highest_bid: service.highest_bid_amount,
                            minimum_bid: service.minimum_bid,
                            deadline: service.deadline,
                            likes_count: service.likes_count,
                            is_liked: service.is_liked
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to fetch service details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceDetails();
    }, [serviceId, itemData]);

    const handleCloseEvent = () => {
        console.log('Event closed:', serviceDetails);
        // Add your close event logic here
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const displayData = serviceDetails || {
        service_url: '',
        name: '',
        author: { name: '', avatar: '' },
        highest_bid: 0,
        minimum_bid: 0,
        likes_count: 0
    };


    const tabs = [
        {label: 'Waves', key: 'item-1', children: <BidsHistory data={bids} active/>},
    ];

    return (
        <section className={styles.details}>
            <div className={`${styles.details_container} container`}>
                <div>
                    <div className="author d-flex align-items-center g-10 mb-15">
                        <Avatar 
                            src={displayData.author.avatar} 
                            alt={displayData.author.name}
                            size="xs" 
                            isVerified={true} 
                        />
                        <span className="text-sm text-bold text-light">@{displayData.author.name}</span>
                    </div>
                    <Sticky enabled={isSticky} top={60} bottomBoundary="#item_main">
                        <div className="media square border-10">
                            <ZoomViewer 
                                originalImg={displayData.service_url}
                                zoomedImg={displayData.service_url}
                                alt={displayData.name}
                            />
                        </div>
                    </Sticky>
                </div>
                <div className={styles.main} id="item_main" style={{marginTop: '-2em'}}>
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {displayData.deadline && (
                                <Countdown 
                                    date={dayjs(displayData.deadline).valueOf()}
                                    renderer={({days, hours, minutes, seconds}) => {
                                        return <span className="h6">🔥 {days}d {hours}h {minutes}m {seconds}s</span>;
                                    }}
                                />
                            )}
                            <h2 className={styles.title}>{displayData.name}</h2>
                            <div className={styles.bid}>
                                <div className="d-flex g-10">
                                    Highest Wave <span className="text-accent text-bold">{displayData.highest_bid ?? 0} TON</span>
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
                    <br></br>
                    <div className="main_tabs">
                        <StyledTabs tabs={tabs}/>
                        <div className={styles.buttons}>
                            {userData?.username === displayData.author.name ? (
                                <GradientBtn 
                                    tag="button" 
                                    onClick={handleCloseEvent}
                                >
                                    Close Event
                                </GradientBtn>
                            ) : (
                                <GradientBtn 
                                    tag="button" 
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    WAVE
                                </GradientBtn>
                            )}
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
    )
}

export default ItemDetails