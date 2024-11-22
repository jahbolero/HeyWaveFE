// styled components
import {StyledAuthorItems, CollectionsGrid} from './style';

// components
import StyledTabs from '@ui/StyledTabs';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import CollectionItem from '@components/CollectionItem';

// hooks
import usePagination from '@hooks/usePagination';
import { useExploreGridContext } from '@contexts/exploreGridContext';

// data placeholder
import author from '@db/author';
import all_items from '@db/all_items';

const SingleItems = ({content, isBidsTab = false}) => {
    const pagination = usePagination(content, 12);

    return (
        <div className="tab-content" ref={pagination.containerRef}>
            <ItemsGrid 
                items={pagination.currentItems()} 
                isPrivate={!isBidsTab} 
                isBidsTab={isBidsTab} 
            />
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

const AuthorItems = () => {
    // Use items from all_items.js instead of author.creations
    const myBids = all_items.map(item => ({
        ...item,
        price: item.price * 1.5, // Different price for bids
        isLiked: true // Mark as liked in bids
    }));

    const tabs = [
        {label: `My Events (${author.creations.length})`, key: 'item-1', children: <SingleItems content={author.creations} />},
        {label: `My Bids (${myBids.length})`, key: 'item-2', children: <SingleItems content={myBids} isBidsTab={true} />}
    ];

    return (
        <StyledAuthorItems>
            <div className="container">
                <StyledTabs tabs={tabs} />
            </div>
        </StyledAuthorItems>
    )
}

export default AuthorItems