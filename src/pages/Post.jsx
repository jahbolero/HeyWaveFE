// utils
import {lazy} from 'react';

// components
import Title from '@components/Title';
import Content from '@layout/post/Content';
const Navigation = lazy(() => import('@layout/post/Navigation'));
const Comments = lazy(() => import('@layout/post/Comments'));

const Post = () => {
    return (
        <>
            <Title title="Features of NFT games that have gained popularity in 2023"/>
            <main>
                <div className="section">
                    <div className="container">
                        <Content/>
                        <Navigation/>
                        <Comments/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Post