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
  }

  return (
    <>
      {/* no interaction transparent screen */}
      {noInteraction && (
          <div className="noInteraction"></div>
      )}

      {/* Overlay animation */}
      {transition && (
        <div className="globalOverlay"></div>
      )}

      {/* transition screen */}
      {overlayTransition && (
        <div className="overlay" style={{backgroundColor:overlayBgColor, color:overlayHalftoneColor}}> 
            <div className="overlayIcon">
                <i className={`bi ${overlayIcon.current}`} style={{color: overlayIconColor, filter: overlayDropshadow}}></i>
            </div>
        </div>
      )}

      {/* show topnav when we not on home page */}
      {location.pathname !== '/' && <TopNav lightMode={lightMode} switchViewMode={switchViewMode}/>}

      <div className = "App">
        <Routes>
          <Route path="/" element={<Home 
            onNavigate={handlePageTransition} 
            lightMode={lightMode} 
            switchViewMode={switchViewMode}
            handleNoInteraction={handleNoInteraction}
            noInteraction={noInteraction}
            overlayTransition={overlayTransition}
            overlayIconColor={overlayIconColor}
            overlayBgColor={overlayBgColor}
            overlayHalftoneColor={overlayHalftoneColor}
            overlayDropshadow={overlayDropshadow}
            overlayIcon={overlayIcon}
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
