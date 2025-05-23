import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';

function App() {

  //states
  const [target, setTarget] = useState(null);
  const [transition, setTransition] = useState(false);

  //variables
  const location = useLocation();
  const navigate = useNavigate();

  //method to handle page transitions
  const handlePageTransition = (path) => {
    if (location.pathname === path) {return};

    setTransition(true);
    setTarget(path);

    //go to spot after this amount of time
    setTimeout(() => {
      navigate(path);
    }, 1000)

    //transition stops after this time
    setTimeout(() => {
      setTransition(false);
      setTarget(null);
    }, 2000)
  }
  return (

    <>
      {/* Overlay animation */}
      {transition && (
        <div className="globalOverlay"></div>
      )}

      <div className = "App">
        <Routes>
          <Route path="/" element={<Home onNavigate={handlePageTransition}/>} />
          <Route path="/about" element={<About onNavigate={handlePageTransition}/>} />
          <Route path="/projects" element={<Projects onNavigate={handlePageTransition}/>} />
          <Route path="/contact" element={<Contact onNavigate={handlePageTransition}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
