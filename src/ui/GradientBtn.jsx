// components
import {animated, useSpring} from '@react-spring/web';
import {NavLink} from 'react-router-dom';

// hooks
import {useState} from 'react';

// utils
import classNames from 'classnames';

const Wrapper = ({tag, href, ...props}) => {
    if (tag === 'button') {
        return <animated.button {...props}/>
    }

    if (href === undefined || href === '#') {
        return <animated.a {...props}/>
    }

    const AnimatedNavLink = animated(NavLink);
    return <AnimatedNavLink to={href} {...props}/>
}

const GradientBtn = ({className, ...props}) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        static: {background: 'linear-gradient(98.49deg, #F5F5DC -11.31%, #59D2FE 76.26%)'},
        active: {background: 'linear-gradient(98.49deg, #59D2FE -11.31%, #F5F5DC 76.26%)'},
    };

    const {background} = useSpring({
        background: isHovered ? variants.active.background : variants.static.background,
        config: {duration: 300},
        ...props,
    });

    return (
        <Wrapper className={classNames('btn btn--gradient', className)} {...props}
                         onMouseEnter={() => setIsHovered(true)}
                         onMouseLeave={() => setIsHovered(false)}
                         style={{background}}>
            {props.children}
        </Wrapper>
    )
}

export default GradientBtn