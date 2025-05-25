//top bar for all pages but home bc home doesnt need the little menu ico

import React, {useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css'

const Sidebar = () => {

    //states
    const [emailAlert, setEmailAlert] = useState(false);

    //on clicking email buttpm
    const handleEmailClick = () => {
        navigator.clipboard.writeText("latal094@uOttawa.ca")

        if (emailAlert) {return};

        setEmailAlert(true);

        setTimeout(() => {
            setEmailAlert(false);
        }, 1000)
    }

  return (
    /* sidenav thing with stuff */
    <div className="globalSideNav">
        <div className="globalSideNavLinks">
            <div className="sideVertLine"></div>

            <div className="sideEnvelopeContainer" onClick={handleEmailClick}>
                <div className={`sideLogos ${emailAlert ? 'lilBounce' : ''}`}>
                    <i class="bi bi-envelope-fill"></i>
                </div>
                {/* email alert popup thingy */}
                {emailAlert && (
                    <div className="emailAlert">copied!</div>
                )}
            </div>

            <div className="sideLogos">
                <a href="https://www.linkedin.com/in/leonardo-atalla-2a2aa6296/">
                    <i class="bi bi-linkedin"></i>
                </a>
            </div>

            <div className="sideLogos">
                <a href="https://github.com/atallaL/portfolio-website">
                    <i class="bi bi-github"></i>
                </a>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;