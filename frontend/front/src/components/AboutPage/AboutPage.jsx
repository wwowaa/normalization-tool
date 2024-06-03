import React, { useState, useEffect } from "react";
import Navbar from "../Visuals/Navbar";
import AboutPageInfo from "./AboutPageInfo";
import "../styles/styles.css";

const backgroundStyle = {
    padding: '0.5rem 1rem',
}

const AboutPage = () => {
    return (
        <body style = {backgroundStyle}>

            <Navbar />
            <AboutPageInfo />
        </body>
      )
}

export default AboutPage;