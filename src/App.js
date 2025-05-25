//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';

//components
import TopNav from './components/Topbar';
import SideNav from './components/Sidebar';

function App() {

  //states
  const [transition, setTransition] = useState(false);

  //mode transition states
  const [lightMode, setLightMode] = useState(true);
  const [overlayTransition, setOverlayTransition] = useState(false);
  const [overlayIconColor, setOverlayIconColor] = useState("");
  const [overlayBgColor, setOverlayBgColor] = useState("");
  const [overlayHalftoneColor, setOverlayHalftoneColor] = useState("");
  const [overlayDropshadow, setOverlayDropshadow] = useState("");
  const [noInteraction, setNoInteraction] = useState(false);
  let overlayIcon = useRef("bi-moon-fill");

  //variables
  const location = useLocation();
  const navigate = useNavigate();

  const menuClickedMethodRef = useRef(null);

  //mode handling
  const switchViewMode = () => {
    if (overlayTransition) {return}; //buffer

    setNoInteraction(true);
    setOverlayTransition(true);
    setOverlayIconColor(lightMode ? "#ECFFD3" : "#190D21");
    setOverlayBgColor(lightMode ? "#080F08" : "#FFFFFF");
    setOverlayHalftoneColor(lightMode ? "#545B49" : "#8E5B67");
    setOverlayDropshadow(lightMode ? "drop-shadow(0 0 5px rgba(180, 180, 180, 0.5))" : "drop-shadow(0 0 7px rgb(223, 165, 165))");

    setTimeout(() => { //1 second before switching themes (full screen cover)
        setLightMode(prev => !prev); 
    }, 1325);

    setTimeout(() => { //not clickable for another second after
        setNoInteraction(false);
        setOverlayTransition(false);
        overlayIcon.current = lightMode ? "bi-sun-fill" : "bi-moon-fill";
    }, 2650);
};

  useEffect(() => {
    document.body.classList.toggle('dark', !lightMode);
  }, [lightMode]);

  const handleNoInteraction = () => {
    setNoInteraction(prev => !prev);
  }

  //method to handle page transitions
  const handlePageTransition = (path) => {
    if (location.pathname === path) {return};

    setTransition(true);

    //go to spot after this amount of time
    setTimeout(() => {
      navigate(path);
    }, 1000)

    //transition stops after this time
    setTimeout(() => {
      setTransition(false);
    }, 2000)
  };

  //handle when menu button is clicked
  const handleMenuClick = () => {
    //if we in home page i want it to slide down, if not, do the other expandy thing
    if(location.pathname === "/") {
      //use method callback from home
      menuClickedMethodRef.current();
    } else {
      //add logic for thingy

    }

  };

  return (
    <>
      {/* no interaction transparent screen */}
      {noInteraction && (
          <div className="noInteraction"></div>
      )}

      {/* page transition animation */}
      {transition && (
        <div className="globalOverlay"></div>
      )}

      {/* mode transition screen */}
      {overlayTransition && (
        <div className="overlay" style={{backgroundColor:overlayBgColor, color:overlayHalftoneColor}}> 
            <div className="overlayIcon">
                <i className={`bi ${overlayIcon.current}`} style={{color: overlayIconColor, filter: overlayDropshadow}}></i>
            </div>
        </div>
      )}

      {/* show sidenav when we not on home page and topnav*/}
      <TopNav lightMode={lightMode} switchViewMode={switchViewMode} onMenuClick={handleMenuClick}/>
      <SideNav />

      <div className = "App">
        <Routes>
          <Route path="/" element={<Home 
            onNavigate={handlePageTransition} 
            lightMode={lightMode} 
            handleNoInteraction={handleNoInteraction}
            noInteraction={noInteraction}
            menuClickedMethodRef={menuClickedMethodRef}
          />} />
          <Route path="/about" element={<About onNavigate={handlePageTransition}/>} />
          <Route path="/projects" element={<Projects onNavigate={handlePageTransition}/>} />
          <Route path="/contact" element={<Contact onNavigate={handlePageTransition}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
