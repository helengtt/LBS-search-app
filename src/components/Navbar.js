import React, { Component } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
  
class Navbar extends Component {
    burgerToggle = () => {
        let linksEl = document.querySelector('.narrowLinks');
        linksEl.style.display = (linksEl.style.display === 'block') ? 'none': 'block';
    }

    render() {
        return (
            <nav>
                <div className="navWide">
                    <div className="wideDiv">
                        <a href="#">Home</a>
                        <a href="#">Contact Us</a>
                        <a href="#">LogIn</a>
                    </div>
                </div>
                <div className="navNarrow">
                    <FontAwesomeIcon className = "iconBars" icon={faBars} onClick={this.burgerToggle}></FontAwesomeIcon>
                    <div className="narrowLinks">
                        <a href="#" onClick={this.burgerToggle}>Home</a>
                        <a href="#" onClick={this.burgerToggle}>Contact Us</a>
                        <a href="#" onClick={this.burgerToggle}>LogIn</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar