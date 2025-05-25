import React, {useState} from 'react'
import './About.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function About() {

    //0 for about me, 2 for experience
    const [pageStateOrder, setPageStateOrder] = useState([2, 0, 1]);
    const [isAnimating, setIsAnimating] = useState(false);

    //hold all page state content
    const pageSections = [
        {
            headerContent: (<h2>who am i?</h2>),
            content: (
                <>
                    <p>My name is Leonardo, but people usually call me Leo.</p>
                    <p>I'm a second year student at the University of Ottawa for Software Engineering. As a student, I've had a lot of fun learning about full stack development and UX/UI design. I really love designing and developing interactive, accessible, and responsive applications for real-world problems.</p>
                </>
            )
        },
        {
            headerContent: (<h2>my experience</h2>),
            content: (
                <>
                    <p>My most recent (and current) job is as a Web Designer and Frontend Developer for Public Services and Procurement Canada, specifically for the CanadaBuys team. The CanadaBuys website and platform is used throughout the country by businesses and the federal government, facilitating streamlined procurement and acting as a hub for procurement information.</p>
                    <p>In my position, my roles are to:</p>
                    <ul>
                        <li>design/redesign UI elements to improve user experience and ensure consistency across the site.</li>
                        <li>develop intuitive webpages while adhering to accessibility guidelines (WCAG 2.1), ensuring a clean user experience. </li>
                        <li>conduct tests and build data scraping scripts to validate content and efficiently discover faults</li>
                    </ul> 
                </>
            )
        },
        {
            headerContent: (<h2>how i work</h2>),
            content: (
                <>
                    <p>Good design should serve the user.</p>
                    <p>I'd like to call my design philosophy utilitarian - when designing UI elements for an application or web page, my main concerns are for functionality, accessibilty, and responsiveness to allow access to as many people as possible.</p>
                    <p>Once the foundation is solid, I like to add tiny, interactive details, making the user experience feel memorable and thoughtful.</p>
                </>
            )
        },
    ];

    //handle page state transitions
    const spinCounterClockwise = () => {
        if (isAnimating) {return};
        setPageStateOrder(([a, b, c]) => [c, a, b]);

    };

    const spinClockwise = () => {
        if (isAnimating) {return};
        setPageStateOrder(([a, b, c]) => [b, c, a]);
    };

    //get class based on index, add an animating class 
    const applyClass = (i) => {
        const animatingClass = isAnimating ? ' transitioning' : '';
        
        if (i === 0) {return 'aboutSectionHeader aboutLeftHeader' + animatingClass}
        else if (i === 1) {return 'aboutSectionHeader aboutMainHeader' + animatingClass};
        return 'aboutSectionHeader aboutRightHeader' + animatingClass;
    };

    return (
        <div className="aboutMain">
            <div className="aboutSection">

                {/* circular thingy */}
                <div className="sectionHeaderContainer">
                    {/* iterating through order and using indexes to render circle thingy */}
                    {pageStateOrder.map((section, index) => (
                        <div
                            key={section}
                            className={applyClass(index)}
                            onClick={() => {
                                if (isAnimating) {return};
                                if (index===0) {spinCounterClockwise()}
                                else if (index===2) {spinClockwise()};
                            }}    
                        >
                            {pageSections[section].headerContent}
                        </div>
                    ))}
                </div>
            <div className="sectionContent">
                {/* render center guy content */}
                {pageSections[pageStateOrder[1]].content}
            </div>
            <div className="sectionNav">
            </div>
        </div>
    </div>
    );
}

export default About;