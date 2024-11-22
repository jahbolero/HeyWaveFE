// styled components
import {StyledAuthorItems, CollectionsGrid} from './style';

// components
import StyledTabs from '@ui/StyledTabs';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import CollectionItem from '@components/CollectionItem';

// hooks
import usePagination from '@hooks/usePagination';

// data placeholder
import author from '@db/author';

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
    // Filter items for My Bids - using first 3 items from all_items as an example
    const myBids = author.creations.slice(0, 3).map(item => ({
        ...item,
        price: item.price * 1.5, // Different price for bids
        isLiked: true // Mark as liked in bids
    }));

    const tabs = [
        {label: `My Events (${author.creations.length})`, key: 'item-1', children: <SingleItems content={author.creations} />},
        {label: `My Bids (${myBids.length})`, key: 'item-2', children: <SingleItems content={myBids} isBidsTab={true} />},
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