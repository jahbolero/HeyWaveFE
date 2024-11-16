// styling
import styles from './style.module.scss';

// components
import CollapsedText from '@components/CollapsedText';

// hooks
import useMeasure from 'react-use-measure';

const Navigation = () => {
    const [ref, {width}] = useMeasure();

    return (
        <div className={`${styles.container} post-section`}>
            <div className={styles.block}>
                <button className={`${styles.navigator} ${styles.prev} navigator navigator--prev`}
                        aria-label="Previous post">
                    <i className="icon icon-angle-left" />
                </button>
                <button className={`${styles.title} ${styles.prev} h5`} ref={ref}>
                    <CollapsedText maxLine={2} text="The rise of the non fungible token internet having trouble"
                                   width={width} />
                </button>
            </div>
            <span className={styles.divider}/>
            <div className={styles.block}>
                <button className={`${styles.title} ${styles.next} h5`}>
                    <CollapsedText maxLine={2} text="Guide to creating & selling digital art NFTs"
                                   width={width} />
                </button>
                <button className={`${styles.navigator} ${styles.next} navigator navigator--next`}
                        aria-label="Next post">
                    <i className="icon icon-angle-right" />
                </button>
            </div>
        </div>
    )
}

export default Navigation