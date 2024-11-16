// components
import Title from '@components/Title';
import AuthorCard from '@layout/author/AuthorCard';
import AuthorItems from '@layout/author/AuthorItems';

const Author = () => {
    return (
        <>
            <Title title="Rebecca Jackson"/>
            <main>
                <AuthorCard />
                <AuthorItems />
            </main>
        </>
    )
}

export default Author