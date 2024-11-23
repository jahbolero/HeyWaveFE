import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import AuthorCard from '@layout/author/AuthorCard';
import Footer from '@layout/home/Footer';  // Import the home page footer

const Author = () => {
    return (
        <>
            <Title title="Author"/>
            <SimplePageHeader title="Author Profile"/>
            <main>
                <div className={`${styles.content} section`}>
                    <div className={`${styles.content_container} container`}>
                        <AuthorCard />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Author; 