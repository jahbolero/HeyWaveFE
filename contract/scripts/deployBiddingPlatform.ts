import { toNano } from '@ton/core';
import { BiddingPlatform } from '../wrappers/BiddingPlatform';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const biddingPlatform = provider.open(await BiddingPlatform.fromInit());

    await biddingPlatform.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(biddingPlatform.address);

    // run methods on `biddingPlatform`
}
