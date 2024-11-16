import styled from 'styled-components/macro';
import {DataGrid} from '@mui/x-data-grid';

const StyledTable = styled(DataGrid)`
  color: var(--text-light) !important;
  border-radius: 10px;
  border: none !important;
  font-size: 17px !important;

  .MuiDataGrid {
    &-columnHeaders {
      background-color: var(--bg-secondary);
      border-bottom: none;
      border-radius: 10px;
    }
    
    &-columnHeader {
      padding: 0;
      pointer-events: none;
    }

    &-columnSeparator {
      display: none !important;
    }
    
    &-cell {
      border-bottom: none !important;
      outline: none !important;
    }
    
    &-row {
      border-bottom: 1px solid var(--divider);
    }
    
    &-footerContainer {
      border-top: none;
      justify-content: center;
    }
  }
`;

export default StyledTable