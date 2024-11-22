import {createContext, useContext, useState} from 'react';

const BidModalContext = createContext({});

export const BidModalContextAPI = ({children}) => {
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    const openBidModal = (serviceData) => {
        setCurrentService(serviceData);
        setIsBidModalOpen(true);
    }

    const closeBidModal = () => {
        setIsBidModalOpen(false);
        setCurrentService(null);
    }

    return (
        <BidModalContext.Provider value={{isBidModalOpen, openBidModal, closeBidModal, currentService}}>
            {children}
        </BidModalContext.Provider>
    )
}

export const useBidModalContext = () => useContext(BidModalContext); 