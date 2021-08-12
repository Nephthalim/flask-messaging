import React from 'react'

import classes from './Nav.module.css';
const Nav = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.container}>
                <a className={classes.logo} href="#">Nephthalim's<span>Chat</span></a>
                <nav>
                    <ul>
                        <li><a
                                href="https://www.linkedin.com/in/nephthalimabebe" target="_blank">Contact</a></li>
                    </ul>
                </nav>
            </div> 
        </div>
    );
}

export default Nav
