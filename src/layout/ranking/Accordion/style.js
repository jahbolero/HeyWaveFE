import styled from 'styled-components/macro';
import {StyledAccordion, StyledAccordionSummary, StyledAccordionDetails} from '@ui/StyledAccordion';

export const RankingSummary = styled(StyledAccordionSummary)`
  padding: 0 0 15px !important;
`;

export const RankingDetails = styled(StyledAccordionDetails)`
  table {
    width: 100%;
    border: 1px solid var(--divider);
    border-collapse: collapse;
    text-align: center;
    margin-bottom: 20px;
    
    tr {
      border-bottom: 1px solid var(--divider);
      height: var(--elements-height);
      
      td {
        padding: 10px;
        font-size: var(--text-sm);
        
        &:first-child {
          background: var(--bg-secondary);
          border-right: 1px solid var(--divider);
          width: 35%;
        }
        
        &:last-child {
          color: var(--text);
        }
      }
    }
  }
`;

export const RankingAccordion = styled(StyledAccordion)`
  border-bottom: 1px solid var(--divider);
`;

