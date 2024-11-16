// styling
import styled from 'styled-components/macro';

// components
import Logo from '@components/Logo';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// hooks
import {useFilterContext} from '@contexts/filterContext';
import {useSidebarContext} from '@contexts/sidebarContext';

const StyledDrawer = styled(SwipeableDrawer)`
  z-index: 10000 !important;

  .MuiDrawer-paper {
    max-width: 460px;
    width: 100%;
    padding: 40px 20px;
    background: var(--bg-primary);
  }
  
  @media screen and (min-width: 768px) {
    .MuiDrawer-paper {
      padding: 40px 30px;
    }
  }
`;

const ResponsiveSidebar = ({children, isMain = false, open, onClose, onOpen}) => {
    const sidebarContext = useSidebarContext();
    
    // Use provided props or context values
    const drawerProps = {
        open: open ?? sidebarContext.isSidebarOpen,
        onClose: onClose ?? sidebarContext.closeSidebar,
        onOpen: onOpen ?? sidebarContext.openSidebar,
    };

    const Header = () => (
        <div className="d-flex justify-content-between align-items-center" style={{marginBottom: 30}}>
            {isMain ? <Logo/> : <h4>Filters</h4>}
            <button className="btn btn--icon btn--icon-sm" 
                    onClick={drawerProps.onClose}>
                <i className="icon icon-xmark"/>
            </button>
        </div>
    );

    return (
        <StyledDrawer {...drawerProps}>
            <Header />
            {children}
        </StyledDrawer>
    );
};

export default ResponsiveSidebar;