import {Fragment} from 'react';
import ResponsiveSidebar from '@ui/ResponsiveSidebar';
import Checkbox from '@ui/Checkbox';
import {useWindowSize} from 'react-use';
import {useExploreGridContext} from '@contexts/exploreGridContext';
import {CATEGORIES, TYPE, STATUS} from '@constants/explore';

const Sidebar = () => {
    const {
        category,
        setCategory,
        status,
        setStatus,
        type,
        setType
    } = useExploreGridContext();
    
    const isDrawer = useWindowSize().width < 1024;
    const SidebarWrapper = isDrawer ? ResponsiveSidebar : Fragment;

    return (
        <SidebarWrapper>
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
        </SidebarWrapper>
    );
};

export default Sidebar;