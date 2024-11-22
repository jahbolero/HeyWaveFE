import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/explore/item?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <form className={styles.search} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.search_input}
            />
            <button type="submit" className={styles.search_button} aria-label="Search">
                <i className="icon icon-search"/>
            </button>
        </form>
    );
};

export default SearchBar; 