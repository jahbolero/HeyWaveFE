// styling
import styled from 'styled-components/macro';

// libraries
import {SendTransactionRequest, useTonConnectUI,useTonAddress,TonConnectButton,} from "@tonconnect/ui-react";
import { truncateMiddle } from '@utils/helpers';

import { useCounterContract } from "../hooks/useCounterContract.ts";
import { useTonConnect } from "../hooks/useTonConnect.ts";
// components
import StyledModal from '@ui/StyledModal';
import GradientBtn from '@ui/GradientBtn';
import {NumericFormat} from 'react-number-format';
import {toast} from 'react-toastify';

// hooks
import {useBidModalContext} from '@contexts/bidModalContext';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';

// utils
import classNames from 'classnames';

// contexts
import { useBids } from '@contexts/bidsContext';
import avatar from '@assets/avatar.webp'; // Add your default avatar

// Add these imports at the top
import {beginCell} from "@ton/core";


const StyledBidModal = styled(StyledModal)`
  .content {
    max-width: 500px;

    &_header {
      text-align: center;
    }

    &_main {
      margin: 30px 0;
      gap: 10px;

      .row {
        flex-direction: column;
      }
    }
  }

  @media screen and (min-width: 414px) {
    .content_main .row {
      flex-direction: row;
    }
  }
`;

const BidModal = () => {
    const [tonConnectUi] = useTonConnectUI();
    const { connected } = useTonConnect();
    const { value, address, sendIncrement } = useCounterContract();
  
    const { addBid } = useBids();
    const minBid = 0.01;
    const fee = 0.1;
    const {isBidModalOpen, closeBidModal} = useBidModalContext();
    const [bid, setBid] = useState(0);
    const {control, handleSubmit, formState: {errors}, reset} = useForm();
    const [isProcessing, setIsProcessing] = useState(false);
    const userFriendlyAddress = useTonAddress();

    const handleClose = () => {
        closeBidModal();
        setBid(minBid);
    }

    const handleBid = async() => {
        setIsProcessing(true);
        
        const bidInNanotons = Math.floor((bid || minBid) * 1000000000).toString();
        
        // Counter contract address - replace with your deployed contract address
        const counterAddress = "EQCQlvO9OxQIu0D9v_siDsDz4ux08Bcv6z857a8o6MP5KzaX";

        console.log("WHY NOT");
        const body = beginCell()
        .storeUint(2335447074, 32)
        .storeUint(0n,64)
        .storeUint(1n,32)
        .endCell();
        

        

        
        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: counterAddress,
                    amount:"50000000",
                    payload: body.toBoc().toString("base64"),
                }
            ]
        }
        toast.success(JSON.stringify(myTransaction));

        try {
            handleClose();
            await tonConnectUi.sendTransaction(myTransaction);
            
            const newBid = {
                price: bid || minBid,
                user: {
                    name: truncateMiddle(userFriendlyAddress, 4, 4),
                    avatar: avatar,
                    isVerified: true
                }
            };
            
            addBid(newBid);
            toast.success('Wave sent successfully!');
            reset();
        } catch (error) {
            console.error('Wave error:', error);
            toast.error('Oops something went wrong.');
        } finally {
            setIsProcessing(false);
        }
    }

    const getTotal = () => {
        return bid !== 0 ? (+bid+(bid*fee)).toFixed(2) : (minBid+(minBid*fee)).toFixed(2);
    }

    return (
        <StyledBidModal open={isBidModalOpen} onClose={handleClose}>
            <div className="content_header d-flex flex-column g-30">
                <div className="d-flex flex-column g-10">
                    <h5>Almost there!</h5>
                </div>
                <form className="d-flex">
                    <Controller control={control}
                                name="bid"
                                rules={{required: true, min: minBid}}
                                defaultValue=""
                                render={({field}) => (
                                    <NumericFormat
                                        className={classNames('field field--outline flex-1', {'field--error': errors.bid})}
                                        placeholder={`${minBid} TON`}
                                        thousandSeparator={true}
                                        allowNegative={false}
                                        suffix=" TON"
                                        name={field.name}
                                        onValueChange={({value}) => {
                                            setBid(+value);
                                            field.onChange(+value);
                                        }}
                                    />
                                )}/>
                </form>
            </div>
            <div className="content_main d-flex flex-column">
                <p className="row d-flex justify-content-between">
                    You must wave at least: <span className="text-bold text-light">{minBid.toFixed(2)} TON</span>
                </p>
                <p className="row d-flex justify-content-between">
                    Service fee: <span className="text-bold text-light">{(bid*0.10).toFixed(2)} TON</span>
                </p>
                <p className="row d-flex justify-content-between">
                    Total wave amount:
                    <span className="text-bold text-light">
                            {getTotal()} TON
                        </span>
                </p>
            </div>
            <div className="content_footer d-flex flex-column g-20">
                <GradientBtn tag="button" onClick={handleSubmit(handleBid)}>Place a Wave</GradientBtn>
                <button className="btn btn--outline" onClick={handleClose}>
                    Cancel
                </button>

                <button
            disabled={!connected}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </button>


            </div>
        </StyledBidModal>
    )
}

export default BidModal