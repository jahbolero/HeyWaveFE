// styling
import styles from './style.module.scss';

// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import Filters from '@layout/activity/Filters';
import Feed from '@layout/activity/Feed';

// context
import {FilterContextAPI} from '@contexts/filterContext';

const Activity = () => {
    return (
        <>
            <Title title="Activity" />
            <SimplePageHeader title="Activity"/>
            <main>
                <div className={`${styles.wrapper} container`}>
                    <FilterContextAPI>
                        <Feed/>
                        <Filters/>
                    </FilterContextAPI>
                </div>
            </main>
        </>
    );
}

export default Activity