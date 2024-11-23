// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import PostDetails from '@layout/post/PostDetails';
import FooterNav from '@components/FooterNav';
import { toast } from 'react-toastify';

import {beginCell,Cell} from "@ton/core";
// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect.ts';
import {useTonConnectUI, useTonAddress} from "@tonconnect/ui-react";

// services
import { serviceService } from '../../services/ServiceService.ts';

const Post = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { address } = useTonConnect();
    const [tonConnectUi] = useTonConnectUI();
    const navigate = useNavigate();

    const handleSubmit = async (formData,file) => {
        if (!address) {
            toast.error('Please connect your wallet first');
            return;
        }

        setIsSubmitting(true);
        try {
            // Get the file from the original formData

            const name = formData.get('name');
            const description = formData.get('description');
            const minimumBid = formData.get('minimumBid');
            const deadline = formData.get('deadline');

            const contractAddress = "EQDbM1IQfeW9-ylz7LLdOU7ftYVbLNqdPnHXhBL9w-wIf6Dp";
            const body = beginCell()
                .storeUint(874375944, 32) // NewService opcode
                .storeStringRefTail(description)
                .endCell();

            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 60,
                messages: [{
                    address: contractAddress,
                    amount: "50000000",
                    payload: body.toBoc().toString("base64"),
                }]
            };

            const txResponse = await tonConnectUi.sendTransaction(transaction);

            const response = await serviceService.createService({address, name, description, minimumBid, deadline}, file);
            if (response) {
                toast.success('Service created successfully!');

            }
        } catch (error) {
            console.error('Failed to create service:', error);
            toast.error(error.message || 'Failed to create service');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Title title="Create Post"/>
            <SimplePageHeader title="Create New Post"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <PostDetails 
                            onSubmit={handleSubmit} 
                            isSubmitting={isSubmitting} 
                        />
                    </div>
                </div>
                <FooterNav />
            </main>
        </>
    );
};

export default Post; 