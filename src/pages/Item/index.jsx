import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ItemDetails from '@layout/item';
import FooterNav from '@components/FooterNav';
import { useLocation } from 'react-router-dom';

const Item = () => {
    const { state } = useLocation();
    
    return (
        <>
            <Title title="Item" />
            <SimplePageHeader title="Item" />
            <main className={styles.main}>
                <ItemDetails itemData={state} />
                <FooterNav />
            </main>
        </>
    );
}

export default Item; 