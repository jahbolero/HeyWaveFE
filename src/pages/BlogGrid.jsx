// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import PostsGrid from '@components/PostsGrid';

const BlogGrid = () => {
    return (
        <>
            <Title title="Blog"/>
            <PageHeader title="Blog"/>
            <main>
                <div className="section">
                    <div className="container">
                        <PostsGrid/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default BlogGrid