import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/bid_parent.tact',
    options: {
        debug: true,
    },
};
