import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faHouse, faMoon} from '@fortawesome/free-solid-svg-icons';

import logoLight from '../../assets/logo_light.png';

function Home() {

    //states
    const [lightMode, setLightMode] = useState(true);
    const [bottomActive, setBottomActive] = useState(false);

    const slideBottomUp = () => {
        setBottomActive(true);
    };

    const slideBottomDown = () => {
        setBottomActive(false);
    };

    //handle scrolling
    useEffect(() => {

        //method for handling scroll direction and position
        const handleScroll = (e) => {
            //if scrolling down and we at the top already
            if (e.deltaY > 0) {
                slideBottomUp();
            //if scrolling up and we at the bottom
            } else if (e.deltaY < 0) {
                slideBottomDown();
            }
        };

        window.addEventListener('wheel', handleScroll, {passive: true});
        
        return () => {
          window.removeEventListener('wheel', handleScroll);
        };
      }, [bottomActive]); 

    
    return (
        <div className="mainContent">
            {/* top bar nav thing */}
            <div className="topNav">
                <div className="topLine"></div>
                <div className="topHouse">
                    <FontAwesomeIcon icon={faHouse} size="1.3x" />
                </div>
                <div className="topMoon">
                    <FontAwesomeIcon icon={faMoon} />
                </div>
                <div className="topLine"></div>
            </div>


            <div className="topMain">
                <div className="container-fluid">
                    <div className="row">

                        {/* logo image */}
                        <div className="logoImageContainer offset-md-1 col-md-5 col-xs-12">
                            <img className="logoImage" src={logoLight} alt="caricature illustration of me" />
                        </div>

                        <div className="topMainText col-md-5 offset-md-1 col-xs-12">
                            <h2>hello, i'm</h2>
                            <h1>leonardo atalla</h1>
                            <p>i'm a full stack developer, UX/UI designer, and software engineering student at the university of ottawa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* for the slide up animation */}
            <div className={`slide ${bottomActive ? 'active' : ''}`}>

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
                <div className="arrow" onClick={slideBottomUp}>
                    <div className="arrowText">
                        <p>scroll!</p>
                    </div>
                    <div className="arrowSymbol">
                        <FontAwesomeIcon icon={faAngleDown} size="2x" />
                    </div>
                </div>

                <div className="bottomMain">
                    <ul>
                        <li> <Link to = "/about"><h2>to about</h2></Link> </li>
                        <li> <Link to = "/projects"><h2>to projects</h2></Link> </li>
                        <li> <Link to = "/contact"><h2>to contact</h2></Link> </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;