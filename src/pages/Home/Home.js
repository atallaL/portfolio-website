import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import logoLight from '../../assets/logo_light.png';

function Home() {

    //states
    const [lightMode, setLightMode] = useState(true);
    
    const atTopRef = useRef(true);

    //keep page positions as reference
    const bottomRef = useRef(null);
    const topRef = useRef(null);

    //scroll to bottom page method
    const scrollBottom = () => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})

    };

    //scroll to top page method
    const scrollTop = () => {
        topRef.current.scrollIntoView({behavior: 'smooth'})
    };

    //handle scrolling
    useEffect(() => {

        //timeout for the scroll
        let scrollTimeout;

        //method for handling scroll direction and position
        const handleScroll = (e) => {
            //if scrolling down and we at the top already
            if (e.deltaY > 0) {
                console.log("scrolling down")
                scrollBottom();
            //if scrolling up and we at the bottom
            } else if (e.deltaY < 0) {
                scrollTop();
                console.log("scrolling up")
            }
        };

        //update position
        const setPosition = () => {
            //use timeout
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const isAtTop = window.scrollY > 50;
                atTopRef.current = isAtTop;
            }, 300);
        };

        window.addEventListener('wheel', handleScroll, {passive: true});
        window.addEventListener('scroll', setPosition);
        
        return () => {
          window.removeEventListener('wheel', handleScroll);
          window.removeEventListener('scroll', setPosition);
        };
      }, []); 

    
    return (
        <div className="mainContent">
            <div className="topMain" ref={topRef}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="topMainText col-md-4 offset-md-1">
                            <h2>hello, i'm</h2>
                            <h1>leonardo atalla</h1>
                            <p>i'm a full stack developer, UX/UI designer, and software engineering student at the university of ottawa</p>
                        </div>

                        {/* logo image */}
                        <div className="logoImageContainer offset-md-1 col-md-6">
                            <img className="logoImage" src={logoLight} alt="caricature illustration of me" />
                        </div>
                        
                    </div>
                </div>

                {/* curve at the bottom of home page */}
                <div className="curveDivider">
                    <svg
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    >

                        {/* define drop shadow for curve*/}
                        <defs>
                            <filter id="drop" height="100%">
                                <feDropShadow dx="0" dy="-5" stdDeviation="15" floodColor="rgba(56, 38, 84, 0.5)" />
                            </filter>
                        </defs>
                    
                        <path
                        d= "M0,160 C480,0 960,0 1440,160 L1440,320 L0,320 Z"
                        fill="#F5F5E7"
                        style={{filter:"url(#drop)"}}
                        />
                    </svg>
                </div>

                {/* arrow in the curve divider */}
                <div className="arrow" onClick={scrollBottom}>
                        <div className="arrowText">
                            <p>scroll!</p>
                        </div>
                        <div className="arrowSymbol">
                            <FontAwesomeIcon icon={faAngleDown} size="2x" />
                        </div>
                    </div>
                </div>

            <div className="bottomMain" ref={bottomRef}>
                <ul>
                    <li> <Link to = "/about"><h2>to about</h2></Link> </li>
                    <li> <Link to = "/projects"><h2>to projects</h2></Link> </li>
                    <li> <Link to = "/contact"><h2>to contact</h2></Link> </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;