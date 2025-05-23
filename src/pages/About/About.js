import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './About.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



function About() {
    //states
    const [lightMode, setLightMode] = useState(true);

    return (
        <div className="aboutMain">
            {/* top bar nav thing */}
            <div className="topNav">
                <div className="topLine"></div>
                    <div className="topMoon">
                        <i className={`bi ${lightMode ? "bi-sun" : "bi-moon"}`}></i>
                    </div>
                <div className="topLine"></div>
            </div>

            <div className="firstSection">
                <h2>about me</h2>
                <p>My name is Leonardo, but people usually call me Leo.</p>
                <p>I'm a second year student at the University of Ottawa for Software Engineering. As a student, I've had a lot of fun learning about full stack development and UX/UI design. I really love designing and developing interactive, accessible, and responsive applications for real-world problems.</p>
            </div>
        </div>
    );
}

export default About;