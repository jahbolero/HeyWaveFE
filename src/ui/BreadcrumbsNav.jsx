// components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {NavLink} from 'react-router-dom';

// hooks
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

// utils
import classNames from 'classnames';

const BreadcrumbsNav = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const path = location.pathname.split('/');
        const pathArray = path.map((item, index) => {
            if (item === '') {
                return {
                    name: 'Profile',
                    path: '/author'
                };
            }
            if (item === 'profile') {
                return {
                    name: 'Edit',
                    path: '/profile'
                };
            }
            return {
                name: item.replace(/-/g, ' '),
                path: path.slice(0, index + 1).join('/')
            };
        });
        setBreadcrumbs(pathArray);
    }, [location]);

    return (
        <Breadcrumbs separator="•" sx={{
            color: 'var(--text)',
            textTransform: 'capitalize',
            '& .MuiBreadcrumbs-separator': {
                color: 'var(--accent)',
            }}}>
            {
                breadcrumbs.map((item, index) => (
                    <NavLink className={classNames('text-bold link-hover', {
                        'text-accent disabled': item.path === location.pathname,
                        'text-uppercase': item.name === 'faq',
                    })}
                          key={item.path}
                          to={item.path}>
                        {item.name}
                    </NavLink>
                ))
            }
        </Breadcrumbs>
    );
}

export default BreadcrumbsNav