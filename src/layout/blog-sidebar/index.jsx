// styled components
import {BlogSidebarWrapper, PostList} from './style';

// components
import Post from './Post';
import Menu from './Menu';
import Pagination from '@ui/Pagination';
import StickyFilterBar from '@ui/StickyFilterBar';
import NothingFound from '@components/NothingFound';

// hooks
import {useWindowSize} from 'react-use';
import usePagination from '@hooks/usePagination';
import {useFilterContext} from '@contexts/filterContext';

// data placeholder
import blog from '@db/blog.js';

const BlogSidebarContent = () => {
    const {filterData} = useFilterContext();
    const isTablet = useWindowSize().width < 1024;
    const posts = isTablet ? blog : blog.filter(post => !post.isPinned);
    const pinned = blog.filter(post => post.isPinned);
    const pagination = usePagination(filterData(posts, 'title'), 5);

    return (
        <section>
            <BlogSidebarWrapper className="container" style={{position: 'relative'}}>
                {isTablet && <StickyFilterBar text="Menu" bottom="#posts"/>}
                {!isTablet && <Post post={pinned[0]} pinned/>}
                <div ref={pagination.containerRef}>
                    <PostList id="posts">
                        {
                            pagination.currentItems().length !== 0 ?
                                pagination.currentItems().map((post, index) => <Post key={post.id} post={post} index={index}/>)
                                :
                                <NothingFound/>
                        }
                    </PostList>
                    {pagination.maxPage > 1 && <Pagination pagination={pagination}/>}
                </div>
                <Menu posts={posts} isDrawer={isTablet}/>
            </BlogSidebarWrapper>
        </section>
    );
}

export default BlogSidebarContent