import {lazy, useEffect, useState} from 'react';
import Title from '@components/Title';
import Sidebar from '@layout/explore/Sidebar';
import FooterNav from '@components/FooterNav';
import { ExploreGridContextAPI } from '@contexts/exploreGridContext';
import { FilterContextAPI } from '@contexts/filterContext';
import { SidebarContextAPI } from '@contexts/sidebarContext';
import { serviceService } from '../../services/ServiceService.ts';

// Import components
import CustomSelect from '@ui/CustomSelect';
import ItemsGrid from '@components/ItemsGrid';
import Pagination from '@ui/Pagination';
import StickyFilterBar from '@ui/StickyFilterBar';
import NothingFound from '@components/NothingFound';
import {useWindowSize} from 'react-use';
import usePagination from '@hooks/usePagination';
import {useExploreGridContext} from '@contexts/exploreGridContext';
import {SORTING_OPTIONS} from '@constants/explore';
import styles from './style.module.scss';

const Items = () => {
    const {sort, setSort, isFilterOpen, openFilter} = useExploreGridContext();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isTablet = useWindowSize().width < 1024;

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await serviceService.getActiveServices();
                const formattedServices = fetchedServices.map((service) => ({
                    id: service.id,
                    image: service.service_url,
                    title: service.name,
                    highest_bid: service.highest_bid_amount,
                    minimum_bid: service.minimum_bid,
                    service_duration: service.service_duration,
                    deadline: service.deadline,
                    likes_count: service.likes_count,
                    is_liked: service.is_liked,
                    author: {
                        name: service.users.username,
                        avatar: service.users.image_url,
                        isVerified: true,
                    }
                }));
                setServices(formattedServices);
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setServices([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Apply sorting to services
    const sortedItems = [...services].sort((a, b) => {
        switch(sort) {
            case 'newest':
                return new Date(b.id) - new Date(a.id);
            case 'oldest':
                return new Date(a.id) - new Date(b.id);
            default:
                return 0;
        }
    });

    const pagination = usePagination(sortedItems, 12);

    return (
        <div className="d-flex flex-column g-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between g-10" 
                 ref={pagination.containerRef}
                 style={{marginTop: isTablet ? '5em' : '0'}}>
                {isTablet && <StickyFilterBar bottom="#items" onFilterClick={openFilter}/>}
                <span className="text-sm">{pagination.showingOf()}</span>
                <CustomSelect options={SORTING_OPTIONS} selected={sort} setSelected={setSort} variant="minimal" />
            </div>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : sortedItems.length > 0 ? (
                    <ItemsGrid 
                        className={styles.grid} 
                        items={pagination.currentItems()} 
                    />
                ) : (
                    <NothingFound />
                )}
                {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
            </div>
        </div>
    )
}

const Explore = () => {
    return (
        <SidebarContextAPI>
            <FilterContextAPI>
                <ExploreGridContextAPI>
                    <>
                        <Title title="Explore"/>
                        <main className="explore">
                            <div className="section mt-0">
                                <div className="container d-flex flex-column g-30">
                                    <Items />
                                </div>
                            </div>
                            <Sidebar />
                            <FooterNav />
                        </main>
                    </>
                </ExploreGridContextAPI>
            </FilterContextAPI>
        </SidebarContextAPI>
    );
}

export default Explore; 