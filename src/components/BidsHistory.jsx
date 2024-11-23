// components
import Avatar from '@ui/Avatar';
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

const BidsHistory = ({ data = [], active }) => {
    
    // Filter bids based on active status - checking if bid_status is 'active' or 'inactive'
    const filteredBids = data
    console.warn(filteredBids);
    
    return (
        <div className="d-flex flex-column g-20">
            {filteredBids.length === 0 && (
                <p className="text-sm text-center">No {active ? 'active' : 'previous'} bids</p>
            )}
            {
                filteredBids.map((item, index) => (
                    <Spring key={item.id} index={index}>
                        <div className="d-flex align-items-center g-15">
                            <Avatar 
                                src={item.users?.image_url} 
                                isVerified={true} 
                                alt={item.users?.username}
                                size="sm"
                            />
                            <div className="text-sm">
                                <p className="text-overflow">
                                    {
                                        active ?
                                            <span className="text-accent text-bold">{item.amount} TON</span>
                                            :
                                            <span>wave created</span>
                                    } by <span className="text-light text-bold"> {item.users?.username}</span>
                                </p>
                                <span className="text-xs">{dayjs(item.created_at).fromNow()}</span>
                            </div>
                        </div>
                    </Spring>
                ))
            }
        </div>
    )
}

export default BidsHistory