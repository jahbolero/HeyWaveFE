// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import PostDetails from '@layout/post/PostDetails';
import FooterNav from '@components/FooterNav';

const Post = () => {
    return (
        <>
            <Title title="Create Post"/>
            <SimplePageHeader title="Create New Post"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <PostDetails />
                    </div>
                </div>
                <FooterNav />
            </main>
        </>
    );
};

export default Post; 