import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { serviceService } from '../../../services/ServiceService.ts';
import { bidService } from '../../../services/BidService.ts';
import styles from './style.module.scss';
import Avatar from '@ui/Avatar';
import GradientBtn from '@ui/GradientBtn';
import Like from '@ui/Like';
import BidsHistory from '@components/BidsHistory';
import Countdown from 'react-countdown';
import dayjs from 'dayjs';
import BidModal from '@components/BidModal';

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [bids, setBids] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const serviceData = await serviceService.getServiceById(serviceId);
                const bidsData = await bidService.getBidsByService(serviceId);
                
                setService(serviceData);
                setBids(bidsData || []);
            } catch (error) {
                console.error('Failed to fetch service details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (serviceId) {
            fetchServiceDetails();
        }
    }, [serviceId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!service) {
        return <div>Service not found</div>;
    }

    const activeBids = bids.filter(bid => bid.active);
    const prevBids = bids.filter(bid => !bid.active);

    return (
        <section className={styles.details}>
            <div className={`${styles.details_container} container`}>
                <div className={styles.media}>
                    <img 
                        src={service.service_url} 
                        alt={service.name} 
                        className={styles.serviceImage}
                    />
                </div>
                
                <div className={styles.main}>
                    <div className={styles.main_about}>
                        <div className="d-flex flex-column g-10">
                            {service.deadline && (
                                <Countdown 
                                    date={dayjs(service.deadline).valueOf()}
                                    renderer={({days, hours, minutes, seconds}) => (
                                        <span className="h6">
                                            🔥 {days}d {hours}h {minutes}m {seconds}s
                                        </span>
                                    )}
                                />
                            )}
                            <h2>{service.name}</h2>
                            <div className={styles.creator}>
                                <Avatar 
                                    src={service.users?.image_url} 
                                    alt={service.users?.username}
                                    isVerified={true}
                                />
                                <span>@{service.users?.username}</span>
                            </div>
                            <div className={styles.bid}>
                                <div className="d-flex g-10">
                                    <span>Minimum Bid:</span>
                                    <span className="text-accent">{service.minimum_bid} TON</span>
                                </div>
                                {service.highest_bid_amount && (
                                    <div className="d-flex g-10">
                                        <span>Highest Bid:</span>
                                        <span className="text-accent">{service.highest_bid_amount} TON</span>
                                    </div>
                                )}
                            </div>
                            <p>{service.description}</p>
                        </div>
                    </div>

                    <div className={styles.bids}>
                        <h3>Active Bids</h3>
                        <BidsHistory data={activeBids} active />
                        
                        <h3>Bid History</h3>
                        <BidsHistory data={prevBids} />
                    </div>

                    <div className={styles.actions}>
                        <Like 
                            count={service.likes_count}
                            isLiked={service.is_liked}
                        />
                        <GradientBtn 
                            onClick={() => setIsModalOpen(true)}
                        >
                            Place Bid
                        </GradientBtn>
                    </div>
                </div>
            </div>

            <BidModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={service}
            />
        </section>
    );
};

export default ServiceDetails; 