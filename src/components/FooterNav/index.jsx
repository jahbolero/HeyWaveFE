import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';

const FooterNav = () => {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item
                    }
                >
                    <i className="icon icon-rocket"></i>
                    <span>Home</span>
                </NavLink>

                <NavLink 
                    to="/explore" 
                    className={({ isActive }) => 
                        isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item
                    }
                >
                    <i className="icon icon-search"></i>
                    <span>Explore</span>
                </NavLink>

                <NavLink 
                    to="/author" 
                    className={({ isActive }) => 
                        isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item
                    }
                >
                    <i className="icon icon-user"></i>
                    <span>Profile</span>
                </NavLink>
            </nav>
        </footer>
    );
};

export default FooterNav; 