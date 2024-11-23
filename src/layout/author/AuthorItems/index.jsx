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
import { useMemo } from 'react';

// const SingleItems = ({content}) => {
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

const AuthorItems = ({services}) => {
    const { activeServices, pastServices } = useMemo(() => {
        const now = new Date();
        return {
            activeServices: services.filter(service => new Date(service.deadline) > now),
            pastServices: services.filter(service => new Date(service.deadline) <= now)
        };
    }, [services]);

    const tabs = [
        {label: `Active (${activeServices.length})`, key: 'item-1', children: <SingleItems content={activeServices} />},
        {label: `Past (${pastServices.length})`, key: 'item-2', children: <SingleItems content={pastServices} />},
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