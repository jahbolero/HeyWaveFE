// styling
import styles from './style.module.scss';

// components
import SectionHeader from '@components/SectionHeader';
import Avatar from '@ui/Avatar';
import CustomSelect from '@ui/CustomSelect';
import Spring from '@components/Spring';

// hooks
import {useState} from 'react';

// utils
import {addZero} from '@utils/helpers';

// data placeholder
import sellers from '@db/sellers';

const BestSellers = () => {
    const options = [
        {value: 'default', label: 'Default sorting'},
        {value: 'az', label: 'A - Z'},
        {value: 'za', label: 'Z - A'},
        {value: 'low', label: 'Highest Waves'}
    ];
    const [selected, setSelected] = useState(options[0]);

    const data = [...sellers].sort((a, b) => {
        switch (selected.value) {
            case 'az':
                return a.nickname.localeCompare(b.nickname);
            case 'za':
                return b.nickname.localeCompare(a.nickname);
            case 'low':
                return b.income - a.income;
            default:
                return a;
        }
    });

    return (
        <section>
            <div className="container">
                <SectionHeader title="Best Creators">
                    <CustomSelect options={options} selected={selected} setSelected={setSelected}/>
                </SectionHeader>
                <div className={styles.grid}>
                    {
                        data.map((seller, index) => (
                            <Spring key={index + selected.value} index={index} type="fade">
                                <div className={`${styles.seller} border-hover border-hover--horizontal bg-primary`}>
                                    <span className="seller_index text-sm">{addZero(index + 1)}</span>
                                    <Avatar src={seller.avatar} alt={seller.nickname} size="sm"
                                            isVerified={seller.isVerified}/>
                                    <div className="seller-info d-flex flex-column">
                                        <span className="text-sm text-bold text-light text-overflow">
                                            @{seller.nickname}
                                        </span>
                                        <span className="text-sm">
                                            ${seller.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </span>
                                    </div>
                                </div>
                            </Spring>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default BestSellers