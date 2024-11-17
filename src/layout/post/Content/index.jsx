// styling
import styles from './style.module.scss';

// components
import Metadata from '@ui/Metadata';
import Avatar from '@ui/Avatar';
import SharePost from '@ui/SharePost';
import LazyImage from '@components/LazyImage';

// assets
import logo from '@assets/HeyWave.png';
import img1 from '@assets/post/1.webp';
import img2 from '@assets/post/2.webp';
import img3 from '@assets/post/3.webp';

const Content = () => {
    return (
        <div className="post-section">
            <div className={styles.header}>
                <div className={styles.header_author}>
                    <Avatar src={logo} alt="HeyWave" size="xs"/> HeyWave
                </div>
                <Metadata className={styles.header_meta} date={new Date(2022, 4, 3)} read={3} comments={2}/>
                <SharePost shared={4}/>
            </div>
            <article>
                <h3 className={styles.title}>Features of NFT games that have gained popularity in 2023</h3>
                <p>
                    Quis vel eros donec ac odio tempor orci dapibus ultrices. Viverra nibh cras pulvinar mattis nunc
                    sed. Eu facilisis sed odio morbi. Eu lobortis elementum nibh tellus molestie nunc non blandit massa.
                    Purus in mollis nunc sed id semper risus. Interdum consectetur libero id faucibus nisl. Ante in nibh
                    mauris cursus mattis molestie a. Donec pretium vulputate sapien nec sagittis aliquam malesuada.
                    Maecenas volutpat blandit aliquam etiam. Curabitur vitae nunc sed velit dignissim sodales ut.
                </p>
                <div className={`${styles.media} ${styles.cover} ${styles.spacer} border-10`}>
                    <LazyImage className={styles.media_img} src={img1} alt="Features of NFT games"/>
                </div>
                <h4 className={styles.subtitle}>Features of NFT games</h4>
                <p>
                    Tellus cras adipiscing enim eu turpis egestas. Amet dictum sit amet justo donec enim diam vulputate
                    ut. Lectus mauris ultrices eros in cursus turpis massa. Molestie a iaculis at erat. Lorem sed risus
                    ultricies tristique. Ullamcorper malesuada proin libero nunc.
                </p>
                <div className={styles.grid}>
                    <div className={`${styles.media} border-10`}>
                        <LazyImage className={styles.media_img} src={img2} alt="Features of NFT games"/>
                    </div>
                    <div className="d-flex flex-column g-20">
                        <p>
                            Elementum tempus egestas sed sed risus pretium. Turpis in eu mi bibendum neque egestas.
                            Turpis egestas sed tempus urna et pharetra pharetra massa.
                        </p>
                        <ul className="post_list d-flex flex-column g-10 text-light">
                            <li className="d-flex g-10">
                                <i className={`${styles.icon} icon-circle-check text-accent`}/>
                                Orci sagittis eu volutpat odio facilisis
                            </li>
                            <li className="d-flex g-10">
                                 <i className={`${styles.icon} icon-circle-check text-accent`}/>
                                Ultrices eros in cursus turpis massa
                            </li>
                            <li className="d-flex g-10">
                                 <i className={`${styles.icon} icon-circle-check text-accent`}/>
                                Tortor condimentum lacinia quis
                            </li>
                            <li className="d-flex g-10">
                                 <i className={`${styles.icon} icon-circle-check text-accent`}/>
                                Venenatis cras sed felis eget velit aliquet
                            </li>
                        </ul>
                    </div>
                </div>
                <q className={`${styles.quote} ${styles.spacer} h6 text-gradient border-10`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Quis vel eros donec ac odio tempor orci dapibus ultrices
                </q>
                <div className={`${styles.media} ${styles.secondary} border-10`}>
                    <LazyImage className={styles.media_img} src={img3} alt="Features of NFT games"/>
                </div>
                <div className={styles.spacer}>
                    <h4 className={styles.subtitle}>The next big trend in NFT games</h4>
                    <div className="d-flex flex-column g-15">
                        <p>
                            Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Nunc sed augue lacus viverra.
                            Eget
                            egestas purus viverra accumsan in nisl. Ullamcorper velit sed ullamcorper morbi. Amet risus
                            nullam
                            eget felis eget nunc lobortis mattis aliquam. Sit amet commodo nulla facilisi nullam
                            vehicula.
                        </p>
                        <ol className="post_list d-flex flex-column g-5">
                            <li className="d-flex g-10">
                                <span className="text-accent">1.</span>
                                Vitae semper quis lectus nulla at volutpat diam
                            </li>
                            <li className="d-flex g-10">
                                <span className="text-accent">2.</span>
                                Morbi tincidunt ornare massa eget egestas purus viverra
                            </li>
                            <li className="d-flex g-10">
                                <span className="text-accent">3.</span>
                                Vitae justo eget magna fermentum iaculis
                            </li>
                        </ol>
                        <p>
                            Egestas integer eget aliquet nibh praesent tristique. In fermentum posuere urna nec
                            tincidunt
                            praesent semper. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat.
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center g-15">
                    <span className="text-light">Tags:</span>
                    <ul className="tags-list">
                        <li className="tag tag--sm">#finance</li>
                        <li className="tag tag--sm">#games</li>
                        <li className="tag tag--sm">#trends</li>
                    </ul>
                </div>
            </article>
        </div>
    )
}

export default Content