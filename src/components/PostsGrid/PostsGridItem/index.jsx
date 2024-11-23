// styling
import styles from './style.module.scss';

// components
import LazyImage from '@components/LazyImage';
import Metadata from '@ui/Metadata';
import CollapsedText from '@components/CollapsedText';
import AuthorTag from '@ui/AuthorTag';
import Spring from '@components/Spring';

// hooks
import useMeasure from 'react-use-measure';

const PostsGridItem = ({post, index}) => {
    const {title, img, read, date, comments} = post;
    const [ref, {width}] = useMeasure();

    return (
       <Spring index={index}>
           <div className={`${styles.wrapper} border-10`}>
               <div className={`${styles.media} shadow-overlay`}>
                   <LazyImage className={styles.media_img} src={img} alt={title}/>
               </div>
               <div className={styles.main}>
                   <AuthorTag/>
                   <div className="d-flex flex-column g-10" ref={ref}>
                       <Metadata date={date} read={read} comments={comments}/>
                       <div className={`${styles.main_title} h5`}>
                           <CollapsedText text={title} width={width}/>
                       </div>
                   </div>
               </div>
           </div>
         </Spring>
    );
}

export default PostsGridItem