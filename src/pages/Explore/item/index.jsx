import { useLocation } from 'react-router-dom';
import ItemDetails from '@layout/item';

const Item = () => {
    const { state } = useLocation();
    
    if (!state) {
        return <div>No item data found</div>;
    }

    return <ItemDetails itemData={state} />;
};

export default Item; 