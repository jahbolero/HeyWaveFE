import { useLocation } from 'react-router-dom';
import ZoomViewer from '@components/ZoomViewer';

const Item = () => {
    const { state } = useLocation();
    
    if (!state) {
        return <div>No item data found</div>;
    }

    const { originalImg, zoomedImg, title, author } = state;

    return (
        <div>
            <ZoomViewer 
                originalImg={originalImg}
                zoomedImg={zoomedImg}
                alt={title}
            />
            <h1>{title}</h1>
            {/* Rest of your item details */}
        </div>
    );
};

export default Item; 