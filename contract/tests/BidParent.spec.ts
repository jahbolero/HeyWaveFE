import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { BidParent } from '../wrappers/BidParent';
import '@ton/test-utils';
import { BidChild } from '../wrappers/BidChildContract';

describe('BidParentContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let bidder: SandboxContract<TreasuryContract>;
    let bidsContract: SandboxContract<BidParent>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        bidsContract = blockchain.openContract(await BidParent.fromInit());
        deployer = await blockchain.treasury('deployer');
        bidder = await blockchain.treasury('bidder');

        const deployResult = await bidsContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: bidsContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // Check is done in beforeEach
    });

    it('should create new bid', async () => {
        const bidResult = await bidsContract.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewBid',
                task: 'Test Bid',
            }
        );

        expect(bidResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: bidsContract.address,
            success: true,
        });

        const numBids = await bidsContract.getNumBids();
        expect(numBids).toBe(1n);
    });

    it('should complete bid', async () => {
        // First create a bid
        await bidsContract.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewBid',
                task: 'Test Bid',
            }
        );

        // Then complete it
        const completeResult = await bidsContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'CompleteBid',
                seqno: 1n,
            }
        );

        expect(completeResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: bidsContract.address,
            success: true,
        });

        // Get the child contract address
        const childAddress = await bidsContract.getBidAddress(1n);
        const childContract = blockchain.openContract(await BidChild.fromAddress(childAddress));
        
        // Check the bid details
        const details = await childContract.getDetails();
        expect(details.completed).toBe(true);
    });

    it('should fail when non-owner tries to complete bid', async () => {
        // Create bid
        await bidsContract.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewBid',
                task: 'Test Bid',
            }
        );

        // Try to complete with non-owner
        const completeResult = await bidsContract.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'CompleteBid',
                seqno: 1n,
            }
        );

        expect(completeResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: bidsContract.address,
            success: false,
        });
    });
});
