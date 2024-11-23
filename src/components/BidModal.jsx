// styling
import styled from 'styled-components/macro';

// libraries
import {useTonConnectUI, useTonAddress} from "@tonconnect/ui-react";
import { truncateMiddle } from '@utils/helpers';
import { useCounterContract } from "../hooks/useCounterContract.ts";
import { useTonConnect } from "../hooks/useTonConnect.ts";
import { bidService } from '../services/BidService.ts';
import BidsHistory from '@components/BidsHistory';

// components
import StyledModal from '@ui/StyledModal';
import GradientBtn from '@ui/GradientBtn';
import {NumericFormat} from 'react-number-format';
import {toast} from 'react-toastify';
import {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {beginCell,Cell} from "@ton/core";
import classNames from 'classnames';
import { toNano,fromNano } from '@ton/core';
import { retry, getServiceResponse, getTransactionDetails } from '../utils/tonUtils.ts';

const BidModal = ({ onClose, isOpen, service }) => {
    const [tonConnectUi] = useTonConnectUI();
    const { connected } = useTonConnect();
    const userFriendlyAddress = useTonAddress();
    const [isProcessing, setIsProcessing] = useState(false);
    
    const baseMinBid = service?.highest_bid || service?.minimum_bid || 0.01;
    const minBid = baseMinBid + 0.1;
    const fee = 0.01;
    const [bid, setBid] = useState(minBid);
    const {control, handleSubmit, formState: {errors}, reset} = useForm();

    const handleBid = async () => {
        if (!service?.id || !userFriendlyAddress) {
            toast.error('Please connect your wallet first');
            return;
        }

        setIsProcessing(true);

        try {
            const contractAddress = "EQBeQlXxiC0NcEICej1RKtlqPTZpdHE2NoxP2XVfZ5gO-ydK";
            console.warn(typeof(bid.toString()))
            const bigBid =toNano(bid);
            // console.warn(bigBid);
            const body = beginCell()
                .storeUint(2965759896, 32) // NewService opcode
                .storeUint(bigBid, 256)
                .endCell();

            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 60,
                messages: [{
                    address: contractAddress,
                    amount: bigBid.toString(),
                    payload: body.toBoc().toString("base64"),
                },
                {
                    address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
                    amount: "60000000",
                }
            ]
            };

            const txResponse = await tonConnectUi.sendTransaction(transaction);


            await bidService.createBid(
                service.id,
                userFriendlyAddress,
                bid || minBid
            );

            toast.success('Wave sent successfully!');
            reset();
            onClose();
        } catch (error) {
                console.error('Wave error:', error);
                toast.error('Failed to send wave. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <StyledModal open={isOpen} onClose={onClose}>
            <div className="content_header d-flex flex-column g-30">
                <div className="d-flex flex-column g-10">
                    <h5>Almost there!</h5>
                </div>
                <form className="d-flex">
                    <Controller 
                        control={control}
                        name="bid"
                        rules={{
                            required: true, 
                            min: minBid,
                            validate: value => 
                                value >= minBid || `Minimum bid must be ${minBid} TON`
                        }}
                        defaultValue=""
                        render={({field}) => (
                            <NumericFormat
                                className={classNames('field field--outline flex-1', {'field--error': errors.bid})}
                                placeholder={`${minBid.toFixed(2)} TON`}
                                thousandSeparator={true}
                                allowNegative={false}
                                suffix=" TON"
                                name={field.name}
                                onValueChange={({value}) => {
                                    setBid(+value);
                                    field.onChange(+value);
                                }}
                            />
                        )}
                    />
                </form>
            </div>
            <div className="content_main d-flex flex-column">
                <p className="row d-flex justify-content-between">
                    You must wave at least: <span className="text-bold text-light">{minBid.toFixed(2)} TON</span>
                </p>
                <p className="row d-flex justify-content-between">
                    Service fee: <span className="text-bold text-light">{(bid*fee).toFixed(2)} TON</span>
                </p>
                <p className="row d-flex justify-content-between">
                    Total wave amount:
                    <span className="text-bold text-light">
                        {(bid + (bid*fee)).toFixed(2)} TON
                    </span>
                </p>
                <div className="waves-history">
                    <h6>Waves</h6>
                    {/* <BidsHistory data={service.bids || []} active /> */}
                </div>
            </div>
            <div className="content_footer d-flex flex-column g-20">
                <GradientBtn 
                    tag="button" 
                    onClick={handleSubmit(handleBid)}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Place a Wave'}
                </GradientBtn>
                <button 
                    className="btn btn--outline" 
                    onClick={onClose}
                    disabled={isProcessing}
                >
                    Cancel
                </button>
            </div>
        </StyledModal>
    )
}

export default BidModal;