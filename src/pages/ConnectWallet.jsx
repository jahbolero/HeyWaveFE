// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Wallet from '@layout/connect-wallet';

const ConnectWallet = () => {
    return (
        <>
            <Title title="Connect wallet" />
            <SimplePageHeader title="Connect wallet" />
            <main>
                <Wallet />
            </main>
        </>
    )
}

export default ConnectWallet