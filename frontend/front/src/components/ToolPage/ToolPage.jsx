import React, { useState, useEffect } from "react";
import Navbar from "../Visuals/Navbar";
import ToolPageInfo from "./ToolPageInfo";
import "../styles/styles.css";


const backgroundStyle = {
    padding: '0.5rem 1rem',
}

const ToolPage = () => {
    return (
        <body style = {backgroundStyle}>

            <Navbar />
            <ToolPageInfo />
        </body>
      )
}

export default ToolPage;