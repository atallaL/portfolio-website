import React from 'react'
import {Link} from 'react-router-dom'


function Home() {
    return (
        <div>
            <h1>hello world</h1>
            <ul>
                <li> <Link to = "/about">to about</Link> </li>
                <li> <Link to = "/projects">to projects</Link> </li>
                <li> <Link to = "/contact">to contact</Link> </li>
            </ul>
        </div>
    );
}

export default Home;