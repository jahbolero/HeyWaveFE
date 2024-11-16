// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import BlogSidebarContent from '@layout/blog-sidebar';

// context
import {FilterContextAPI} from '@contexts/filterContext';

const BlogSidebar = () => {
    return (
        <>
            <Title title="Blog" />
            <PageHeader title="Blog" />
            <main>
                <FilterContextAPI>
                    <BlogSidebarContent />
                </FilterContextAPI>
            </main>
        </>
    );
}

export default BlogSidebar