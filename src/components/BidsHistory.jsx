// components
import Avatar from '@ui/Avatar';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';
import { useBids } from '@contexts/bidsContext';
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

// contexts


const BidsHistory = ({ active }) => {
    const { bids } = useBids();
    
    // For debugging
    console.log('Current bids:', bids);
    
    // Filter bids based on active status
    const filteredBids = bids?.filter(bid => active ? bid.active : !bid.active) || [];
    
    // For debugging
    console.log('Filtered bids:', filteredBids);

    return (
        <div className="d-flex flex-column g-20">
            {filteredBids.length === 0 && (
                <p className="text-sm text-center">No {active ? 'active' : 'previous'} bids</p>
            )}
            {
                filteredBids.map((item, index) => (
                    <Spring key={item.id} index={index}>
                        <div className="d-flex align-items-center g-15">
                            <Avatar src={item.user.avatar} isVerified={item.user.isVerified} alt={item.user.name}
                                    size="sm"/>
                            <div className="text-sm">
                                <p className="text-overflow">
                                    {
                                        item.active ?
                                            <span className="text-accent text-bold">{item.price} TON</span>
                                            :
                                            <span>bid cancelled</span>
                                    } by <span className="text-light text-bold"> {item.user.name}</span>
                                </p>
                                <span className="text-xs">{dayjs(item.date).fromNow()}</span>
                            </div>
                        </div>
                    </Spring>
                ))
            }
        </div>
    )
}

export default BidsHistory