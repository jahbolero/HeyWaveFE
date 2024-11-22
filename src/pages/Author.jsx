// components
import Title from '@components/Title';
import AuthorCard from '@layout/author/AuthorCard';
import AuthorItems from '@layout/author/AuthorItems';
import FooterNav from '@components/FooterNav';

const Author = () => {
    return (
        <>
            <Title title="Profile"/>
            <main>
                <AuthorCard />
                <AuthorItems />
                <FooterNav />
            </main>
        </>
    )
}

export default Author