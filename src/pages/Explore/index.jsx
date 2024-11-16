import {lazy} from 'react';
import Title from '@components/Title';
import Sidebar from '@layout/explore/Sidebar';
import FooterNav from '@components/FooterNav';
import { ExploreGridContextAPI } from '@contexts/exploreGridContext';
import { FilterContextAPI } from '@contexts/filterContext';
import { SidebarContextAPI } from '@contexts/sidebarContext';

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
    const {sortedItems, sort, setSort, isFilterOpen, openFilter} = useExploreGridContext();
    const pagination = usePagination(sortedItems, 12);
    const isTablet = useWindowSize().width < 1024;

    return (
        <div className="d-flex flex-column g-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between g-10" ref={pagination.containerRef}
            style={{marginTop: isTablet ? '5em' : '0'}}>
                {isTablet && <StickyFilterBar bottom="#items" onFilterClick={openFilter}/>}
                <span className="text-sm">{pagination.showingOf()}</span>
                <CustomSelect options={SORTING_OPTIONS} selected={sort} setSelected={setSort} variant="minimal" />
            </div>
            <div>
                {sortedItems.length > 0 ? (
                    <ItemsGrid className={styles.grid} items={pagination.currentItems()} />
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