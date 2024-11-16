// utils
import loadable from '@loadable/component'

// components
const Header = loadable(() => import('@components/Header'));
const BidModal = loadable(() => import('@components/BidModal'));

const AppLayout = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <BidModal/>
        </div>
    )
}

export default AppLayout