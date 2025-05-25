import React from 'react';
import {Link} from 'react-router-dom';

import './Projects.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Projects() {




    return (
        <div className = "projectMain">
            <div className = "projectGrid">
                <div className = "projectCard">
                    <h2>service site</h2>
                    <p>under construction</p>
                    <i class="bi bi-box-seam-fill"></i>
                </div>
                <div className = "projectCard">
                    <h2>small game</h2>
                    <p>currently building</p>
                    <i class="bi bi-joystick"></i>
                </div>
                <div className = "projectCard">
                    <h2>e-commerce site</h2>
                    <p>in development</p>
                    <i class="bi bi-bag-fill"></i>
                </div>
                <div className = "projectCard">
                    <h2>analytics site</h2>
                    <p>coming soon</p>
                    <i class="bi bi-bar-chart-line-fill"></i>
                </div>
            </div>
        </div>
    );
}

export default Projects;