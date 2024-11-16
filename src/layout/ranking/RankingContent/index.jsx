// styling
import styles from './style.module.scss';

// hooks
import {useState} from 'react';
import {useWindowSize} from 'react-use';

// utils
import {lazy} from 'react';

// constants
import {FILTERS} from '@constants/ranking';

// components
import CustomSelect from '@ui/CustomSelect';
const Table = lazy(() => import('../Table'));
const Accordion = lazy(() => import('../Accordion'));

const RankingContent = () => {
    const [period, setPeriod] = useState(FILTERS.period[0]);
    const [category, setCategory] = useState(FILTERS.category[0]);
    const [type, setType] = useState(FILTERS.type[0]);
    const isAccordion = useWindowSize().width < 1024;

    return (
        <div className="section mt-0">
            <div className="container d-grid g-30">
                <div className={styles.container}>
                    <CustomSelect selected={period} setSelected={setPeriod} options={FILTERS.period} />
                    <CustomSelect selected={category} setSelected={setCategory} options={FILTERS.category} />
                    <CustomSelect selected={type} setSelected={setType} options={FILTERS.type} />
                </div>
                {
                    isAccordion ?
                        <Accordion period={period} category={category} type={type} />
                        :
                        <Table period={period} category={category} type={type} />
                }
            </div>
        </div>
    )
}

export default RankingContent