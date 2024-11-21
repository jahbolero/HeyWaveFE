import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/bidding_platform.tact',
    options: {
        debug: true,
    },
};
