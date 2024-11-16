// styled components
import {StyledPost, StyledPinnedPost} from './style';

// components
import LazyImage from '@components/LazyImage';
import {NavLink} from 'react-router-dom';
import Metadata from '@ui/Metadata';
import SharePost from '@ui/SharePost';
import AuthorTag from '@ui/AuthorTag';
import CollapsedText from '@components/CollapsedText';

// hooks
import useMeasure from 'react-use-measure';

const Post = ({post, pinned = false, index}) => {
    const [ref, {width}] = useMeasure();
    const {img, title, preview, date, read, comments, shared, isPinned} = post;
    const Wrapper = pinned ? StyledPinnedPost : StyledPost;
    const wrapperProps = pinned ? {} : {};

    return (
        <Wrapper {...wrapperProps}>
            <div className="media border-10">
                <LazyImage className="media_img" src={img} alt={title}/>
                <AuthorTag/>
            </div>
            <div className="main" ref={ref}>
                <div className="main_meta d-flex flex-wrap justify-content-between g-10">
                    <div className="d-flex g-8">
                        {isPinned && <i className="icon icon-bookmark text-accent"/>}
                        <Metadata date={date} read={read} comments={comments}/>
                    </div>
                    <SharePost shared={shared}/>
                </div>
                <NavLink className="main_title h3 link-hover" to="/post">
                    <CollapsedText text={title} width={width}/>
                </NavLink>
                <p className="main_preview">{preview}</p>
            </div>
        </Wrapper>
    )
}

export default Post