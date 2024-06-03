import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { tool_route } from "../Routing/Routes";
import "../styles/styles.css";

const mainPageText = {
    border: "0.5rem 2rem",
    background: "linear-gradient(90deg, rgba(129,121,252,1) 0%, rgba(192,139,217,1) 100%)",
    padding: "2rem", // Add padding to create space around the text
    fontFamily: '"Source Sans 3"',
    fontSize: 24
};

const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(16,11,97,1) 0%, rgba(6,13,66,1) 38%, rgba(62,22,77,1) 65%, rgba(73,19,98,1) 100%)',
    color: 'white',
    fontFamily: '"Source Sans 3"',
    fontSize: 18
}

const MainPageInfo = () => {
    return (
        <div style={mainPageText}>
            <h1>Нормалізація БД</h1>
            <p>
                Даний веб-сайт дозволяє працювати з функціональними залежностями, до списку можливостей входять такі функції, як:
            </p>
            <ul>
                <li>Проведення мінімізації поданої множини функціональних залежностей</li>
                <li>Знаходження третьої нормальної форми БД за допомогою декомпозиції</li>
                <li>Перевірка 3НФ на властивість з'єднання без втрат</li>
                <li>Перевірка 3НФ на збереження залежностей</li>
            </ul>
            <p>
                Також до калькулятору можна перейти на вкладці <b>"Калькулятор"</b>, а детальніше ознайомитись з тим, як працює алгоритм, на вкладці <b>"Алгоритм"</b>.
            </p>

            <Button component={Link} to={tool_route} style={buttonStyle}>
              Почати роботу
            </Button>

        </div>
    );
};

export default MainPageInfo;
