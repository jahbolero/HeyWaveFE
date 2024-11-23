// styling
import styles from './style.module.scss';

// components
import {NavLink} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper';
import Avatar from '@ui/Avatar';
import AnimatedText from 'react-animated-text-content';
import Spring from '@components/Spring';
import {useState, useEffect} from 'react';

// services
import { serviceService } from '../../../services/ServiceService.ts';

// assets
import video from '@assets/home/hero/particles.mp4';
import defaultAvatar from '@assets/home/hero/avatar1.webp';

const Hero = () => {
    const [heroData, setHeroData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHeroServices = async () => {
            try {
                const services = await serviceService.getActiveServices();
                // Take the first 4 services and format them
                const formattedServices = services.slice(0, 4).map((service) => ({
                    id: service.id,
                    image: service.service_url,
                    title: service.name,
                    highest_bid: service.highest_bid_amount,
                    minimum_bid: service.minimum_bid,
                    deadline: service.deadline,
                    likes_count: service.likes_count,
                    is_liked: service.is_liked,
                    author: {
                        name: service.users.username,
                        avatar: service.users.image_url,
                        isVerified: true,
                    }
                }));
                
                setHeroData(formattedServices);
            } catch (error) {
                console.error('Failed to fetch hero services:', error);
                setHeroData([]); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeroServices();
    }, []);

    return (
        <section className={styles.hero}>
            <video src={video}
                   className={styles.video}
                   autoPlay loop muted disablePictureInPicture playsInline controls={false} />
            <div className={`${styles.hero_container} container`}>
                <div className={`${styles.media} bg-secondary border-hover`}>
                    <Swiper className={styles.media_slider}
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView="auto"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                575: {
                                    slidesPerView: 2
                                },
                                991: {
                                    slidesPerView: 1
                                }
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            speed={1500}
                            pagination={{
                                clickable: true,
                                horizontalClass: styles.pagination
                            }}>
                        {
                            heroData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="d-flex flex-column g-30">
                                        <div className="d-flex flex-column g-5">
                                            <div>
                                                <img className="border-10" src={item.image} alt={item.title} />
                                            </div>
                                            <div className="d-flex flex-column g-5">
                                                <h4>{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center g-10">
                                            <Avatar 
                                                src={item.author.avatar}
                                                isVerified={item.author.isVerified}
                                                alt={item.author.name}
                                                size="xs"
                                            />
                                            <NavLink className="text-sm text-light text-bold link-hover" to="/author">
                                                @{item.author.name}
                                            </NavLink>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className={styles.main}>
                    <div style={{ marginTop: '3rem' }}>
                        <AnimatedText
                            type="words"
                            animationType="throw"
                            duration={0.5}
                            tag="h1"
                            includeWhiteSpaces>
                            HeyWave
                        </AnimatedText>
                        <Spring delay={600}>
                            <p className={styles.main_text} style={{marginTop: '1rem', marginBottom: '-2rem'}}>
                                Decentralized attention marketplace for the next generation creator economy <br/>
                                <br></br>
                            </p>
                        </Spring>
                    </div>  
                </div>
            </div>
        </section>
    )
}

export default Hero