import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Projects.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Projects() {

    return (
        <div className = "projectMain">
            <p>(click a box to view project)</p>
            <div className = "projectGrid">
                <div className = "projectCard" onClick={() => window.open("https://atallal.github.io/another-home", "_blank")}>
                    <div className = "projectCardContent">
                        <h2>Another Home</h2>
                        <p><strong>service site:</strong> a high fidelity prototype of an animal shelter website providing animal adoption and rehoming services built using React.js and Bootstrap</p>
                    </div>
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