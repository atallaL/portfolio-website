import React, {useRef, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import logoLight from '../../assets/logo_light.png';
import logoDark from '../../assets/logo_dark.png';

function Home({
    onNavigate,
    lightMode,
    switchViewMode,
    noInteraction,
    handleNoInteraction,
}) {

    const navigate = useNavigate();

    //states
    const [bottomActive, setBottomActive] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const [messages, setMessages] = useState([]);
    
    //transition states and var
    let darkCount = useRef(0);

    //curve divider color responsiveness
    const curveColor = lightMode ? "#F5F5E7" : "#080F08";
    const curveShadowColor = lightMode ? "drop-shadow(0 -3px 5px rgba(56, 38, 84, 0.5))" : "drop-shadow(0 -3px 5px rgba(145, 175, 142, 0.3))";

    //typewriter effect at bottom thingy
    const [bottomDescription, setBottomDescription] = useState("");
    const intervalRef = useRef(null);

    //thingy to make type effect
    const typeEffect = (text) => {
        let i = 0;

        if(intervalRef){clearInterval(intervalRef.current)};
        setBottomDescription("");

        //every this interval of time, get another piece of the given text
        intervalRef.current = setInterval(() => {

            if (i < text.length) {
                const char = text.charAt(i); //responsiveness fix
                setBottomDescription((prev) => prev + char);
                i++;  
            } else {
                clearInterval(intervalRef.current);
            }
        }, 70);
    };

    //clear the text helper function
    const clearText = () => {
        clearInterval(intervalRef.current);
        setBottomDescription("");
    };


    //sliding methods for clarity
    const slideBottomUp = () => {
        //if we alr at bottom       
        if (bottomActive) {return};

        setBottomActive(true);
        handleNoInteraction();

        setTimeout(() => {
            handleNoInteraction();
        }, 1500);

    };

    const slideBottomDown = () => {
        //if we alr at top
        if (!bottomActive) {return};

        setBottomActive(false);
        handleNoInteraction();
        
        setTimeout(() => {
            handleNoInteraction(false);
        }, 1500);
    
    };

    //messages for when logo is clicked
    const possibleMessages = lightMode ? ["hello!", 'hi!', 'hey!'] : ["zz", "zzz", "zzzzzz"]

    //helper method to generate a random angle and message
    const generateAngleMessage = () => {
        let message = "";

        //count clicks when its not dark mode
        if (!lightMode) {
            darkCount.current += 1;
        } else {
            darkCount.current = 0;
        };

        //if clicked 25 times, send custom message
        if (darkCount.current > 25) {
            darkCount.current = 0;
            message = "dude stop"
        } else {
            message = possibleMessages[Math.floor(Math.random() * possibleMessages.length)] //generate random message from array
        }
        
        const angle = (Math.random()-0.5) * (Math.PI / 2); //random angle (angle -45 to 45)
        const id = Date.now() + Math.random(); //effective way to make random unique IDs
        const distance = 50 + Math.random() * 10; //message travels a random distance
        const x = (Math.sin(angle) * 3) * distance; //x and y values to force upwards movement
        const y = -Math.abs(Math.cos(angle) * distance) - 100;
        return {id, angle, message, distance, x, y};
    }

    //handle scrolling
    useEffect(() => {
        if (noInteraction) {return};

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
      }, [bottomActive, noInteraction]); 


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

    }

    //on initial page loading
    useEffect(() => {

        //get all like elements on page
        const sections = [
            document.querySelector(".topMainText"),
            document.querySelector(".logoImageContainer"),
            document.querySelector(".topNav"),
            document.querySelector(".arrow"),
        ];
        

        //first text part --> second text part --> logo --> top and right like line elements --> the scroll thing  
        //do a load in for each element
        sections.forEach((elem, index) => {
            elem.classList.add("enterAnim"); //add the class for elements that will be animated
            setTimeout(() => {
                elem.classList.add("visible"); //make visible
            }, index*1000); //do it every like .5 seconds
        });
    }, []);

    return (
        <div className="mainContent">

            {/* no interaction transparent screen */}
            {noInteraction && (
                <div className="noInteraction"></div>
            )}

            {/* top bar nav thing */}
            <div className="topNav">
                <div className="topLine"></div>
                    <div className="topMoon" onClick={switchViewMode}>
                        <i className={`bi ${lightMode ? "bi-sun" : "bi-moon"}`}></i>
                    </div>
                <div className="topLine"></div>
            </div>


            <div className="topMain">
                <div className="container-fluid">
                    <div className="row">

                        {/* logo image */}
                        <div className="enterAnim logoImageContainer offset-md-1 col-md-5 col-xs-12">
                            <div className="logoImageWrapper" onClick={handleMeClick}>
                                <img className="logoImage" src={lightMode ? logoLight : logoDark} alt="caricature illustration of me" />
                                
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

                        <div className="enterAnim topMainText col-md-5 offset-md-1 col-xs-12">
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
                        <a href="https://github.com/atallaL/portfolio-website">
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
                    style={{filter:curveShadowColor}}
                    >
                        <path
                        d= "M0,160 C480,0 960,0 1440,160 L1440,320 L0,320 Z"
                        fill={curveColor}
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
                            {/* on hover, type the thingy out */}
                            <button 
                                onClick={() => onNavigate('/about')}
                                onMouseEnter = {() => {clearText(); typeEffect("a little about me")}}
                                onMouseLeave = {clearText}
                            >
                                <p>#1</p><h2>about</h2>
                            </button> 
                            <button 
                                onClick={() => onNavigate('/projects')}
                                onMouseEnter = {() => {clearText(); typeEffect("stuff i worked on")}}
                                onMouseLeave = {clearText}
                            >
                                <p>#2</p><h2>projects</h2>
                            </button> 
                            <button 
                                onClick={() => onNavigate('/contact')}
                                onMouseEnter={() => {clearText(); typeEffect("i'd love to chat!")}}
                                onMouseLeave={clearText}
                            >
                                <p>#3</p><h2>contact</h2>
                            </button> 
                        </div>

                        {/* add functionality */}
                        <div className="bottomDesc">
                            <p>&lt;/{bottomDescription}<span className="typingIndicator">|</span>&gt;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;