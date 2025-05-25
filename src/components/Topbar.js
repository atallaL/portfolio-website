//top bar for all pages but home bc home doesnt need the little menu ico

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Topbar.css'

const Topbar = ({lightMode, switchViewMode, onMenuClick}) => {

  return (
    <div className="globalTopNav">
        <div className="globalTopLine"></div>
            <div className="globalTopMoon" onClick={switchViewMode}>
                <i className={`bi ${lightMode ? "bi-sun" : "bi-moon"}`}></i>
            </div>
        <div className="globalTopLine"></div>

        <div className="globalTopMenu" onClick={onMenuClick}>
            <i className="bi bi-list"></i>
        </div>
    </div>
  );
};

export default Topbar;