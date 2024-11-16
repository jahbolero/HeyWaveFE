import {Fragment} from 'react';
import ResponsiveSidebar from '@ui/ResponsiveSidebar';
import Checkbox from '@ui/Checkbox';
import {useWindowSize} from 'react-use';
import {useExploreGridContext} from '@contexts/exploreGridContext';
import {CATEGORIES} from '@constants/explore';

const Sidebar = () => {
    const {
        category,
        setCategory,
        isFilterOpen,
        openFilter,
        closeFilter
    } = useExploreGridContext();
    const isDrawer = useWindowSize().width < 1024;

    if (!isDrawer) {
        return null;
    }

    return (
        <ResponsiveSidebar
            open={isFilterOpen}
            onClose={closeFilter}
            onOpen={openFilter}
        >
            <div className="sidebar">
                <div className="sidebar_wrapper">
                    <div className="sidebar_block">
                        <h5>Categories</h5>
                        <ul className="sidebar_list">
                            {CATEGORIES.map(cat => (
                                <li className="sidebar_list-item" key={cat.value}>
                                    <Checkbox 
                                        id={cat.value}
                                        checked={category?.value === cat.value}
                                        onChange={() => setCategory(cat)}
                                    />
                                    <label htmlFor={cat.value}>{cat.label}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ResponsiveSidebar>
    );
};

export default Sidebar; 