import React, { useState, useEffect } from "react";
import Navbar from "../Visuals/Navbar";
import MainPageInfo from "./MainPageInfo";
import "../styles/styles.css";


const backgroundStyle = {
    padding: '0.5rem 1rem',
}

const MainPage = () => {
    return (
        <body style = {backgroundStyle}>

            <Navbar />
            <MainPageInfo />
        </body>
      )
}

export default MainPage;