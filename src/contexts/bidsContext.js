import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import bidsData from '@db/bids.json';

const BidsContext = createContext();
const STORAGE_KEY = 'app_bids_new';

export const BidsProvider = ({ children }) => {
    const [bids, setBids] = useState(() => {
        const storedBids = localStorage.getItem(STORAGE_KEY);
        return storedBids ? JSON.parse(storedBids) : bidsData.bids;
    });

    // Persist bids to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bids));
    }, [bids]);

    const addBid = useCallback(async (newBid) => {
        try {
            const updatedBids = bids.map(bid => ({
                ...bid,
                active: false
            }));
            
            const fullNewBid = {
                ...newBid,
                active: true,
                date: dayjs().toISOString(),
                id: `bid-${Date.now()}`
            };
            
            const newBids = [fullNewBid, ...updatedBids];
            setBids(newBids);
            
        } catch (error) {
            console.error('Error adding bid:', error);
            throw error;
        }
    }, [bids]);

    return (
        <BidsContext.Provider value={{ bids, addBid }}>
            {children}
        </BidsContext.Provider>
    );
};

export const useBids = () => {
    const context = useContext(BidsContext);
    if (!context) {
        throw new Error('useBids must be used within a BidsProvider');
    }
    return context;
}; 