import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { BiddingPlatform } from '../wrappers/BiddingPlatform';
import { ServiceChild } from '../wrappers/ServiceChild';
import '@ton/test-utils';

describe('BiddingPlatform', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let bidder: SandboxContract<TreasuryContract>;
    let biddingPlatform: SandboxContract<BiddingPlatform>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        biddingPlatform = blockchain.openContract(await BiddingPlatform.fromInit());
        deployer = await blockchain.treasury('deployer');
        bidder = await blockchain.treasury('bidder');

        const deployResult = await biddingPlatform.send(
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
            to: biddingPlatform.address,
            deploy: true,
            success: true,
        });
    });

    it('should create new service', async () => {
        const serviceResult = await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        expect(serviceResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: biddingPlatform.address,
            success: true,
        });

        const numServices = await biddingPlatform.getNumServices();
        expect(numServices).toBe(1n);

        // Check child contract
        const childAddress = await biddingPlatform.getServiceAddress(1n);
        const childContract = blockchain.openContract(await ServiceChild.fromAddress(childAddress));
        const serviceInfo = await childContract.getServiceInfo();
        expect(serviceInfo).toBe('Test Service');
    });

    it('should place bid on service', async () => {
        // First create a service
        await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        const childAddress = await biddingPlatform.getServiceAddress(1n);
        const childContract = blockchain.openContract(await ServiceChild.fromAddress(childAddress));

        // Place bid
        const bidAmount = toNano('1');
        const bidResult = await childContract.send(
            bidder.getSender(),
            {
                value: bidAmount,
            },
            {
                $$type: 'PlaceBid',
                bidAmount: bidAmount,
            }
        );

        expect(bidResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: childAddress,
            success: true,
        });

        // Check bid details
        const bidDetails = await childContract.getHighestBidDetails();
        expect(bidDetails.bidAmount).toBe(bidAmount);
        expect(bidDetails.bidder?.toString()).toBe(bidder.address.toString());
    });

    it('should finalize service by owner', async () => {
        // Create service
        await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        // Finalize service
        const finalizeResult = await biddingPlatform.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'FinalizeService',
                serviceId: 1n,
            }
        );

        expect(finalizeResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: biddingPlatform.address,
            success: true,
        });
    });

    it('should fail when non-owner tries to finalize service', async () => {
        // Create service
        await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        // Try to finalize with non-owner
        const finalizeResult = await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'FinalizeService',
                serviceId: 1n,
            }
        );

        expect(finalizeResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: biddingPlatform.address,
            success: false,
        });
    });

    it('should fail when placing lower bid', async () => {
        // Create service
        await biddingPlatform.send(
            bidder.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        const childAddress = await biddingPlatform.getServiceAddress(1n);
        const childContract = blockchain.openContract(await ServiceChild.fromAddress(childAddress));

        // Place first bid
        await childContract.send(
            bidder.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'PlaceBid',
                bidAmount: toNano('1'),
            }
        );

        // Try to place lower bid
        const lowerBidResult = await childContract.send(
            bidder.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'PlaceBid',
                bidAmount: toNano('0.5'),
            }
        );

        expect(lowerBidResult.transactions).toHaveTransaction({
            from: bidder.address,
            to: childAddress,
            success: false,
        });
    });

    it('should handle funds correctly during bidding', async () => {
        // Create service
        await biddingPlatform.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'NewService',
                description: 'Test Service',
            }
        );

        const childAddress = await biddingPlatform.getServiceAddress(1n);
        const childContract = blockchain.openContract(await ServiceChild.fromAddress(childAddress));

        // First bidder sends 5 TON
        const bidder1 = await blockchain.treasury('bidder1');
        const initialBidder1Balance = await bidder1.getBalance();
        
        await childContract.send(
            bidder1.getSender(),
            {
                value: toNano('5'),
            },
            {
                $$type: 'PlaceBid',
                bidAmount: toNano('5'),
            }
        );

        // Second bidder sends 7 TON
        const bidder2 = await blockchain.treasury('bidder2');
        await childContract.send(
            bidder2.getSender(),
            {
                value: toNano('7'),
            },
            {
                $$type: 'PlaceBid',
                bidAmount: toNano('7'),
            }
        );

        // Check bidder1 got refunded
        const bidder1BalanceAfter = await bidder1.getBalance();
        expect(bidder1BalanceAfter).toBeGreaterThan(initialBidder1Balance - toNano('0.1')); // Account for gas fees

        // Store initial owner balance before finalization
        const initialOwnerBalance = await deployer.getBalance();

        // Finalize the service with enough value to cover gas
        await biddingPlatform.send(
            deployer.getSender(),
            {
                value: toNano('1'),  // Increased gas value
            },
            {
                $$type: 'FinalizeService',
                serviceId: 1n,
            }
        );

        // Check owner received the highest bid
        const ownerBalanceAfter = await deployer.getBalance();
        expect(ownerBalanceAfter).toBeGreaterThan(initialOwnerBalance + toNano('6.8')); // Slightly reduced expectation to account for gas
    });
});
