import { toNano } from '@ton/core';
import { BidParent } from '../wrappers/BidParent';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const bidParent = provider.open(await BidParent.fromInit());

    await bidParent.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(bidParent.address);

    // run methods on `bidParent`
}
