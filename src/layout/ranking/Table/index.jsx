// styled components
import StyledTable from './style';

// components
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@ui/Pagination';

// constants
import {COLUMNS} from '@constants/ranking';

// utils
import {memo} from 'react';

// data placeholder
import ranking from '@db/ranking';

const TablePagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination pagination={{
            currentPage: page,
            maxPage: pageCount,
            next: () => apiRef.current?.setPage(page + 1),
            prev: () => apiRef.current?.setPage(page - 1),
            goToPage: (page) => apiRef.current?.setPage(page)
        }} />
    );
}

const Table = ({period, category, type}) => {
    const dataByCategory = category.value === 'all' ? ranking : ranking.filter(item => item.categories && item.categories.includes(category.value));

    return (
        <StyledTable
            rows={dataByCategory}
            columns={COLUMNS(period, category, type)}
            pageSize={15}
            disableSelectionOnClick
            disableColumnMenu
            autoHeight
            rowHeight={90}
            headerHeight={90}
            classes={{
                columnHeader: 'h6',
            }}
            components={{
                Pagination: TablePagination,
            }}
        />
    )
}

export default memo(Table);