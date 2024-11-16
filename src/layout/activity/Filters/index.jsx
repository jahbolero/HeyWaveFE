// styling
import styles from './style.module.scss';

// components
import ResetFilters from '@ui/ResetFilters';

// hooks
import {useFilterContext} from '@contexts/filterContext';

// utils
import classNames from 'classnames';

const Filters = () => {
    const {filters, changeFilters} = useFilterContext();
    const categories = [
        {name: 'purchase', icon: 'basket-regular', label: 'Sales'},
        {name: 'like', icon: 'heart-o-regular', label: 'Likes'},
        {name: 'list', icon: 'tags-regular', label: 'Listings'},
        {name: 'follow', icon: 'check-regular', label: 'Followings'},
        {name: 'bid', icon: 'bid', label: 'Bids'},
    ];

    return (
        <div className={styles.filters}>
            <div className="d-flex align-items-center g-30">
                <h5>Filters</h5> <ResetFilters text="Reset filters" />
            </div>
            <ul className="tags-list">
                {
                    categories.map((category, index) => (
                        <li key={index}>
                            <button className={classNames('tag tag--sm', {'active' : filters.includes(category.name)})}
                                    onClick={() => changeFilters(category.name)}>
                                <i className={`icon icon-${category.icon}`}></i>
                                <span>{category.label}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Filters