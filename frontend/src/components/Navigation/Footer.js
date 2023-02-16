import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <div className="footer">
            <div><p>©{new Date().getFullYear()} Al's BnB</p></div>
            <div className="footer-links">
                <a href='https://www.github.com/AuchnotOuch'><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/alex-auch/"><i className="fa-brands fa-linkedin"></i></a>
            </div>
        </div>
    )
}

export default Footer
