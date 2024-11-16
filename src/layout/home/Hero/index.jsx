// styling
import styles from './style.module.scss';

// components
import {NavLink} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper';
import Avatar from '@ui/Avatar';
import AnimatedText from 'react-animated-text-content';
import Spring from '@components/Spring';
import SwiperNav from '@ui/SwiperNav';
import {useState} from 'react';

// assets
import video from '@assets/home/hero/particles.mp4';

// data placeholder
import hero from '@db/hero';

const Hero = () => {
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
                                horizontalClass: styles.pagination,
                                renderBullet: (index, className) => {
                                    return `<span class="${className}">
                                        <span class="bullet-text">
                                            ${index === 0 ? 'Trending' : 'Live'}
                                        </span> 
                                    </span>`;
                                }
                            }}>
                        {
                            hero.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                   <div className="d-flex flex-column g-30">
                                       <div>
                                           <img className="border-10" src={item.image} alt={item.title} />
                                       </div>
                                       <div className="d-flex flex-column g-5">
                                           <NavLink className="h4 link-hover" to="/explore/item" >
                                               {item.title}
                                           </NavLink>
                                           <div className="d-flex align-items-center g-10">
                                               <Avatar src={item.author.avatar}
                                                       isVerified={item.author.isVerified}
                                                       alt={item.author.name}
                                                       size="xs"/>
                                               <NavLink className="text-sm text-light text-bold link-hover" to="/author">
                                                   @{item.author.name}
                                               </NavLink>
                                           </div>
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
                            HeyWave. Build connection now!
                        </AnimatedText>
                        <Spring delay={600}>
                            <p className={styles.main_text} style={{marginTop: '3rem', marginBottom: '-2rem'}}>
                                Digital marketplace for crypto collectibles and non-fungible tokens. <br/>
                                Buy, sell, and discover exclusive digital assets.
                            </p>
                        </Spring>
                    </div>  
                </div>
            </div>
        </section>
    )
}

export default Hero