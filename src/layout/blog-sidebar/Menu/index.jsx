// styled components
import StyledMenu from './style';

// components
import {Calendar} from 'react-calendar';
import SearchForm from '@ui/SearchForm';
import {NavLink} from 'react-router-dom';
import LazyImage from '@components/LazyImage';
import Metadata from '@ui/Metadata';
import CollapsedText from '@components/CollapsedText';
import ResponsiveSidebar from '@ui/ResponsiveSidebar';
import {Fragment} from 'react';
import ResetFilters from '@ui/ResetFilters';

// hooks
import {useFilterContext} from '@contexts/filterContext';
import {useState} from 'react';
import useMeasure from 'react-use-measure';

// utils
import dayjs from 'dayjs';
import classNames from 'classnames';

const Menu = ({posts, isDrawer}) => {
    const [ref, {width}] = useMeasure();
    const {setQuery, filters, changeFilters} = useFilterContext();
    const [date, setDate] = useState(new Date());
    const Wrapper = isDrawer ? ResponsiveSidebar : Fragment;

    const tags = ['bitcoin', 'cryptocurrency', 'art', 'music', 'internet', 'NFT', 'etherium', 'games', 'trends',
        'finance', 'blockchain', '3D', 'development', 'images', 'faq'];

    const categoriesList = [
        {name: 'crypto', label: 'Crypto'},
        {name: 'nft', label: 'NFT'},
        {name: 'internet', label: 'Internet'},
        {name: 'token', label: 'Token'},
        {name: 'blockchain', label: 'Blockchain'},
    ];

    const goPrevMonth = () => {
        setDate(dayjs(date).subtract(1, 'month').set('date', 1).toDate());
    }

    const goNextMonth = () => {
        setDate(dayjs(date).add(1, 'month').set('date', 1).toDate());
    }

    const formatWeekdaySingleLetter = date => {
        return dayjs(date).format('dd').charAt(0);
    }

    const getRecentPosts = () => {
        return posts.filter(post => dayjs(post.date).isSame(dayjs(), 'month')).slice(0, 5);
    }

    return (
        <Wrapper>
            <StyledMenu className="sidebar sidebar_wrapper">
                <div className="sidebar_block">
                    <h5>Search</h5>
                    <SearchForm handler={setQuery} placeholder="Search here..."/>
                </div>
                <div className="sidebar_block">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5>Categories</h5>
                        <ResetFilters/>
                    </div>
                    <ul className="sidebar_list">
                        {
                            categoriesList.map(category => (
                                <li className={classNames('sidebar_list-item justify-content-between', {'active': filters.includes(category.name)})}
                                    key={category.name}
                                    onClick={() => changeFilters(category.name)}>
                                    <span>
                                        {category.label}
                                    </span>
                                    <span className="count">
                                        {posts.filter(post => post.categories.includes(category.name)).length}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="sidebar_block">
                    <h5>Recent posts</h5>
                    <ul className="sidebar_list g-20">
                        {
                            getRecentPosts().map(post => (
                                <li className="sidebar_list-item--post d-flex align-items-center g-20"
                                    key={post.id}>
                                    <div className="media border-10">
                                        <LazyImage src={post.img} alt={post.title}/>
                                    </div>
                                    <div className="main d-flex flex-column g-5" ref={ref}>
                                        <Metadata date={post.date} read={post.read} isShort/>
                                        <NavLink className="text-bold text-light link-hover" to="/post">
                                            <CollapsedText text={post.title} width={width}/>
                                        </NavLink>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="sidebar_block">
                    <h5>Tags</h5>
                    <ul className="tags-list">
                        {
                            tags.map((tag, index) => (
                                <li className="tag tag--sm" key={index}>#{tag}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="sidebar_block">
                    <h5>Comments</h5>
                    <ul className="d-flex flex-column g-10">
                        <li className="d-flex g-10">
                            <i className="icon icon-comment text-accent"/>
                            <p>
                                <span className="text-bold">Admin</span> in tempor eros tortor, a ornare
                            </p>
                        </li>
                        <li className="d-flex g-10">
                            <i className="icon icon-comment text-accent"/>
                            <p>
                                <span className="text-bold">Admin</span> in tempor eros tortor, a ornare
                            </p>
                        </li>
                        <li className="d-flex g-10">
                            <i className="icon icon-comment text-accent"/>
                            <p>
                                <span className="text-bold">Admin</span> in tempor eros tortor, a ornare
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="sidebar_block">
                    <h5>Archives</h5>
                    <ul className="sidebar_list">
                        <li className="sidebar_list-item justify-content-between">
                            <a className="d-flex align-items-center g-10 text-bold text-light link-hover"
                               href="@layout/blog-sidebar/Menu/index#">
                                <i className="icon icon-calendar text-accent"/> February
                            </a>
                            <span className="count">23</span>
                        </li>
                        <li className="sidebar_list-item justify-content-between">
                            <a className="d-flex align-items-center g-10 text-bold text-light link-hover"
                               href="@layout/blog-sidebar/Menu/index#">
                                <i className="icon icon-calendar text-accent"/> March
                            </a>
                            <span className="count">08</span>
                        </li>
                        <li className="sidebar_list-item justify-content-between">
                            <a className="d-flex align-items-center g-10 text-bold text-light link-hover"
                               href="@layout/blog-sidebar/Menu/index#">
                                <i className="icon icon-calendar text-accent"/> April
                            </a>
                            <span className="count">12</span>
                        </li>
                        <li className="sidebar_list-item justify-content-between">
                            <a className="d-flex align-items-center g-10 text-bold text-light link-hover"
                               href="@layout/blog-sidebar/Menu/index#">
                                <i className="icon icon-calendar text-accent"/> March
                            </a>
                            <span className="count">16</span>
                        </li>
                    </ul>
                </div>
                <div className="sidebar_block">
                    <h5>Calendar</h5>
                    <Calendar locale="en-US" value={date}
                              formatShortWeekday={(locale, date) => formatWeekdaySingleLetter(date)}/>
                    <div className="d-flex justify-content-between">
                        <button className="calendar-nav d-flex align-items-center g-10"
                                onClick={goPrevMonth}
                                data-direction="prev">
                            <i className="icon icon-angle-left"/> Previous
                        </button>
                        <button className="calendar-nav d-flex align-items-center g-10"
                                onClick={goNextMonth}
                                data-direction="next">
                            Next <i className="icon icon-angle-right"/>
                        </button>
                    </div>
                </div>
            </StyledMenu>
        </Wrapper>
    )
}

export default Menu