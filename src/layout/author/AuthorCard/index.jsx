// styled components
import StyledAuthorCard from './style';

// components
import Socials from '@components/Socials';
import Avatar from '@ui/Avatar';
import CollapsedText from '@components/CollapsedText';
import Spring from '@components/Spring';

// hooks
import {useState} from 'react';
import {useWindowSize} from 'react-use';
import useMeasure from 'react-use-measure';
import { useNavigate } from 'react-router-dom';

// utils
import {toast} from 'react-toastify';
import {truncateMiddle} from '@utils/helpers';
import classNames from 'classnames';

// assets
import avatar from '@assets/avatar.webp';

const AuthorCard = () => {
    const navigate = useNavigate();
    const [ref, {width}] = useMeasure();
    const [followers, setFollowers] = useState(2734);
    const [isFollowed, setIsFollowed] = useState(false);
    const isMobile = useWindowSize().width < 768;
    const id = '0x80D167890abcdef1234567890abcdef1234567890abcdef12345678900F1C';
    const bio = `Creator's bio`
    const [showMenu, setShowMenu] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(id);
        toast.success('Copied to clipboard');
    }

    const handleFollow = e => {
        setIsFollowed(!isFollowed);
        setFollowers(isFollowed ? followers - 1 : followers + 1);
    }

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <StyledAuthorCard>
            <div className="cover"></div>
            <div className="container">
                   <Spring className="main d-flex flex-column g-30 bg-primary border-10">
                       <div className="main_header d-flex">
                           <Avatar src={avatar} alt="@ventuniconeymon" isVerified={true}/>
                           <div className="main_header-follow d-flex align-items-center g-20">
                            <span className="d-flex flex-column">
                                <span className="h6">14.5k</span>
                                <span className="meta">Following</span>
                            </span>
                               <span className="d-flex flex-column">
                                <span className="h6">{followers}</span>
                                <span className="meta">Followers</span>
                            </span>
                               <button className={classNames('btn btn--outline', {'active': isFollowed})}
                                         onClick={handleFollow}>
                                   {
                                       isFollowed ?
                                           (
                                               isMobile ?
                                                   <i className="icon icon-user-minus-solid"></i>
                                                   :
                                                   <span>Unfollow</span>
                                           )
                                           :
                                           (
                                               isMobile ?
                                                   <i className="icon icon-user-plus-solid"></i>
                                                   :
                                                   <span>Follow</span>
                                           )
                                   }
                               </button>
                           </div>
                           <div className="main_header-actions d-flex g-10">
                               <button className="btn btn--icon" aria-label="Share profile">
                                   <i className="icon icon-share"/>
                               </button>
                               <div className="menu-container">
                                   <button 
                                       className="btn btn--icon" 
                                       aria-label="Menu"
                                       onClick={handleMenuClick}
                                   >
                                       <i className="icon icon-ellipsis"/>
                                   </button>
                                   {showMenu && (
                                       <div className="menu-dropdown bg-primary border-10">
                                           <button 
                                               className="menu-item d-flex align-items-center g-10"
                                               onClick={() => {
                                                   setShowMenu(false);
                                                   navigate('/profile');
                                               }}
                                           >
                                               <i className="icon icon-edit"/>
                                               <span>Edit Profile</span>
                                           </button>
                                       </div>
                                   )}
                               </div>
                           </div>
                       </div>
                       <div className="main_info">
                           <h4 className="main_info-name">Creator's Name</h4>
                           <div className="main_info-id d-flex flex-wrap align-items-center text-sm">
                               <span className="text-bold text-light">@creatorUsername</span>
                               <div className="d-flex align-items-center g-10">
                                   <span>{truncateMiddle(id, 5, 4)}</span>
                                   <button className="text-accent" onClick={handleCopy} aria-label="Copy ID">
                                       <i className="icon-copy"/>
                                   </button>
                               </div>
                           </div>
                           <Socials className="main_info-socials"/>
                           <div className="main_info-bio" ref={ref}>
                               <CollapsedText width={width} text={bio} lines={3} withButton />
                           </div>
                       </div>
                   </Spring>
            </div>  
            <div className="create-event-section">
                <button 
                    className="btn btn--gradient w-100"
                    onClick={() => navigate('/post')}
                >
                    <span>Create Event</span>
                </button>
            </div>
        </StyledAuthorCard>
    )
}

export default AuthorCard

