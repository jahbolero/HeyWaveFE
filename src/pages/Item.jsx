// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ItemDetails from '@layout/item';
import { useLocation } from 'react-router-dom';

const Item = () => {
    const { state } = useLocation();
    
    return (
        <>
            <Title title="Item details" />
            <SimplePageHeader title="Item details" />
            <main>
                <ItemDetails itemData={state} />
            </main>
        </>
    );
}

export default Item