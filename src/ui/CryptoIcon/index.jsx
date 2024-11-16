// styling
import styles from './style.module.scss';

// assets
import ton from '@assets/icons/ton.svg';
import imx from '@assets/icons/imx.svg';

const CryptoIcon = ({crypto}) => {
    const icons = [
        {icon: ton, name: 'TON', label: 'TON'},
        {icon: imx, name: 'imx', label: 'ImmutableX'},
    ];

    const icon = icons.find((i) => i.name === crypto);

    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={icon.icon} alt={icon.label} />
        </div>
    );
}

export default CryptoIcon