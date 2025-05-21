import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faHouse, faSun} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import logoLight from '../../assets/logo_light.png';

function Home() {

    //states
    const [lightMode, setLightMode] = useState(true);
    const [bottomActive, setBottomActive] = useState(false);
    const [messages, setMessages] = useState([]);

    //sliding methods for clarity
    const slideBottomUp = () => {
        setBottomActive(true);
    };

    const slideBottomDown = () => {
        setBottomActive(false);
    };

    //messages for when logo is clicked
    const lightMessages = ["hello!", 'hi!', 'hey!',]

    //helper method to generate a random angle and message
    const generateAngleMessage = () => {
        const message = lightMessages[Math.floor(Math.random() * lightMessages.length)] //generate random message from array
        const angle = (Math.random()-0.5) * (Math.PI / 2); //random angle (angle -45 to 45)
        const id = Date.now() + Math.random(); //effective way to make random unique IDs
        const distance = 50 + Math.random() * 10; //message travels a random distance
        const x = (Math.sin(angle) * 3) * distance; //x and y values to force upwards movement
        const y = -Math.abs(Math.cos(angle) * distance) - 100;
        return {id, angle, message, distance, x, y};
    }

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


    //handle when the caricature is clicked (give bounce to logo and then spit out random text)
    const handleMeClick = () => {
        
        //get logo image and then remove bounce in case we are midway through an animation
        const logo = document.querySelector('.logoImage');
        logo.classList.remove('bounce');

        //force reflow
        void logo.offsetWidth;

        //add bounce
        logo.classList.add('bounce')

        //generate a message and put it into messages state
        const generatedMessage = generateAngleMessage();
        setMessages(prev => [...prev, generatedMessage]);

        //remove after some time based on id (1.5s)
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== generatedMessage.id));
        }, 1500);
    }
    
    return (
        <div className="mainContent">
            {/* top bar nav thing */}
            <div className="topNav">
                <div className="topLine"></div>
                <div className="topMoon">
                    <FontAwesomeIcon icon={faSun} />
                </div>
                <div className="topLine"></div>
            </div>


            <div className="topMain">
                <div className="container-fluid">
                    <div className="row">

                        {/* logo image */}
                        <div className="logoImageContainer offset-md-1 col-md-5 col-xs-12">
                            <div className="logoImageWrapper" onClick={handleMeClick}>
                                <img className="logoImage" src={logoLight} alt="caricature illustration of me" />
                                
                                {/* render generated messages */}
                                <div className="messageContainer">
                                    {messages.map(({id, angle, message, distance, x, y}) => (
                                        <div 
                                            key={id} 
                                            className="floatingMessage" 
                                            style={{
                                                '--angle': `${angle}rad`,
                                                '--distance': `${distance}px`,
                                                '--x': `${x}px`, 
                                                '--y': `${y}px`,
                                                '--rotation': `${angle*(180/Math.PI)}deg`
                                            }}
                                        >
                                            {message}
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                        <div className="topMainText col-md-5 offset-md-1 col-xs-12">
                            <h2>hello, i'm</h2>
                            <h1>leonardo atalla</h1>
                            <p>i'm a full stack developer, UX/UI designer, and software engineering student at the university of ottawa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom right nav */}
            <div className={`socialNavContainer ${bottomActive ? 'active' : ''}`}>
                <div className="socialLinks">
                    <div className={`vertLine ${bottomActive ? 'active' : ''}`}></div>
                    <div className="socialLinkedin">
                        <a href="https://www.linkedin.com/in/leonardo-atalla-2a2aa6296/">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                    <div className="socialGit">
                        <a href="href=https://github.com/atallaL/portfolio-website">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
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
                <div className="arrow">
                    <div className="arrowText">
                        <p>scroll!</p>
                    </div>
                    <div className="arrowSymbol" onClick={slideBottomUp}>
                        <FontAwesomeIcon icon={faAngleDown} size="2x" />
                    </div>
                </div>

                <div className="bottomMain">
                    <div className="bottomLinkContainer">
                        <div className="bottomLinks">
                            <Link to = "/about"><p>#1</p><h2>about</h2></Link> 
                            <Link to = "/projects"><p>#2</p><h2>projects</h2></Link> 
                            <Link to = "/contact"><p>#3</p><h2>contact</h2></Link> 
                        </div>
                    </div>
                    
                    <div className="bottomDesc">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;