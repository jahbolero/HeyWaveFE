// styling
import styles from './style.module.scss';

// components
import Ticker from '@components/Ticker';
import LazyImage from '@components/LazyImage';
import Spring from '@components/Spring';

// assets
import wallet from '@assets/icons/wallet.svg';
import folder from '@assets/icons/folder.svg';
import cloud from '@assets/icons/cloud.svg';
import tags from '@assets/icons/tags.svg';

const CreateAndSell = () => {
    const data = [
        {
            icon: wallet,
            title: 'Set up your wallet',
            text: 'Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Proin libero nunc consequat interdum.'
        },
        {
            icon: folder,
            title: 'Create your collection',
            text: 'Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Risus nullam eget felis eget nunc lobortis.'
        },
        {
            icon: cloud,
            title: 'Add your NFTs',
            text: 'Volutpat commodo sed egestas egestas. Mollis aliquam ut porttitor leo a diam sollicitudin tempor.'
        },
        {
            icon: tags,
            title: 'List them for sale',
            text: 'Diam sit amet nisl suscipit adipiscing bibendum est. Porttitor eget dolor morbi non arcu risus quis varius quam.'
        }
    ];

    return (
        <div>
            <Ticker text="Create & sell your NFTs" />
            <div className="container">
                <div className={styles.list}>
                    {
                        data.map((item, index) => (
                            <Spring className={styles.list_item} key={index} index={index}>
                                <LazyImage className={styles.img} src={item.icon} alt={item.title} effect="opacity" />
                                <h5 className={styles.title}>{item.title}</h5>
                                <p className={styles.text}>{item.text}</p>
                            </Spring>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateAndSell