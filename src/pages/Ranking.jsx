// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import RankingContent from '@layout/ranking/RankingContent';

const Ranking = () => {
    return (
        <>
            <Title title="Ranking"/>
            <SimplePageHeader title="Ranking"/>
            <main>
                <RankingContent/>
            </main>
        </>
    );
}

export default Ranking