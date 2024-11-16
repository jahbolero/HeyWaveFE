// styled components
import Activity from './style';

// components
import StyledTabs from '@ui/StyledTabs';
import LazyImage from '@components/LazyImage';
import {NavLink} from 'react-router-dom';
import Pagination from '@ui/Pagination';
import NothingFound from '@components/NothingFound';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';

// hooks
import usePagination from '@hooks/usePagination';

// context
import {useFilterContext} from '@contexts/filterContext';

// data placeholder
import activity from '@db/activity';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const TabContent = ({activity, currentUser, perPage, data}) => {
    const details = ({type, qty, operation}) => {
        switch (type) {
            case 'bid':
                return {
                    text: `bid ${operation === 'cancel' ? 'canceled' : 'placed'} by `,
                    icon: 'bid'
                }
            case 'like':
                return {
                    text: 'liked by ',
                    icon: 'heart-o-regular'
                }
            case 'list':
                return {
                    text: `${qty} edition${qty !== 1 ? 's' : ''} minted by `,
                    icon: 'tags-regular'
                }
            case 'purchase':
                return {
                    text: `${qty} edition${qty !== 1 ? 's' : ''} purchased by `,
                    icon: 'basket-regular'
                }
            default:
            case 'subscription':
                return {
                    text: 'started following ',
                    icon: 'check-regular'
                }
        }
    }

    const dataArr = () => {
        switch (activity) {
            case 'recent':
                return data.filter((item) => dayjs(item.date).isAfter(dayjs().subtract(1, 'days')));
            case 'unread':
                return data.filter((item) => item.read === false);
            default:
            case 'all':
                return data;
        }
    }

    const pagination = usePagination(dataArr(), perPage);

    return (
        <>
            <div className="list d-flex flex-column g-20" ref={pagination.containerRef}>
                {
                    pagination.currentItems().length ?
                        pagination.currentItems().map((item, index) => (
                            <Spring key={item.id} index={index}>
                                <div className="list-item d-flex">
                                    <LazyImage className="media square border-10" src={item.user.avatar}
                                               alt={item.user.name}/>
                                    <div
                                        className="main d-flex align-items-center g-20 bg-secondary text-bold text-sm border-10">
                                        <div className="wrapper flex-1">
                                            <h6 className="main_user">{currentUser}</h6>
                                            <p className="main_details">
                                                {details(item.details).text}
                                                <NavLink className="text-light link-hover" to="/author">
                                                    {item.user.name}
                                                </NavLink>
                                                {item.details.type === 'purchase' && ` for ${item.details.price} TON`}
                                            </p>
                                            <span>{dayjs(item.date).fromNow()}</span>
                                        </div>
                                        <span className="main_icon btn--icon text-accent">
                                            <i className={`icon-${details(item.details).icon}`}/>
                                        </span>
                                    </div>
                                </div>
                            </Spring>
                        ))
                        :
                        <NothingFound/>
                }
            </div>
            {pagination.maxPage > 1 && <Pagination pagination={pagination}/>}
        </>
    )
}

const Feed = () => {
    const currentUser = 'Rebecca Jackson';
    const perPage = 10;
    const {filters} = useFilterContext();
    const data = filters.length ? activity.filter((item) => filters.includes(item.details.type)) : activity;

    const commonProps = {
        currentUser,
        perPage,
        data
    }

    const tabs = [
        {label: 'All activity', key: 'item-1', children: <TabContent activity="all" {...commonProps}/>},
        {label: 'Recent', key: 'item-2', children: <TabContent activity="recent" {...commonProps}/>},
        {label: 'Unread', key: 'item-3', children: <TabContent activity="unread" {...commonProps}/>},
    ];

    return (
        <Activity>
            <StyledTabs tabs={tabs}/>
        </Activity>
    )
}

export default Feed