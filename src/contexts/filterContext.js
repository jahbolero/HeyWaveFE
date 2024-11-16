import {createContext, useContext, useState, useEffect} from 'react';
import useScrollLock from '@hooks/useScrollLock';

const FilterContext = createContext(undefined);

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilterContext must be used within a FilterContextAPI');
    }
    return context;
};

export const FilterContextAPI = ({children}) => {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {lockScroll, unlockScroll} = useScrollLock();

    const setQuery = (query) => {
        setSearch(query);
    }

    const changeFilters = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(f => f !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    }

    const resetFilters = () => setFilters([]);

    const openSidebar = () => {
        setIsSidebarOpen(true);
        console.log('Opening sidebar:', isSidebarOpen); // Debug log
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        console.log('Closing sidebar:', isSidebarOpen); // Debug log
    };

    useEffect(() => {
        console.log('Sidebar state changed:', isSidebarOpen); // Debug log
        isSidebarOpen ? lockScroll() : unlockScroll();
    }, [isSidebarOpen, lockScroll, unlockScroll]);

    const value = {
        search,
        setQuery,
        filters,
        changeFilters,
        resetFilters,
        isSidebarOpen,
        openSidebar,
        closeSidebar
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};