import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { tool_route } from "../Routing/Routes";
import "../styles/styles.css";

const aboutPageText = {
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

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
};

const thStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

const tdStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

const AboutPageInfo = () => {
    return (
        <div style={aboutPageText}>
            <h1>Нормалізація БД</h1>
            <h2>Приклад використання алгоритму:</h2>
            <a></a>

            <h3>F = &#123;A → CD, B → C, BD → C&#125; </h3>

            <a><b>1. Побудуємо мінімальне покриття даної множини ФЗ:</b><br /></a>
            <a>I. Одноатрибутна права частина<br /></a>
            <a>За правилом декомпозиції D3:<br /></a>
            <a>(A → CD) & (C ⊆ CD) ⇒ A → C<br /></a>
            <a>(A → CD) & (D ⊆ CD) ⇒ A → D<br /></a>
            <a> F1 = &#123;A → D, A → C, B → C, BD → C&#125;<br /></a>
            <a><br /></a>

            <a>II. Антинадлишковість ФЗ:<br /></a>
            <a>1) F2.1 = &#123;A → C, B → C, BD → C&#125;<br /></a>
            <a>F1<sup>+</sup> ~ F2.1<sup>+</sup>: ❌<br /></a>
            <a><br /></a>
            <a>F2.1<sup>+</sup> ⊆ F1<sup>+</sup> ✔️ (очевидно)<br /></a>
            <a>F1<sup>+</sup> ⊆ F2.1<sup>+</sup> ❌<br /></a>
            <a>Чи A → D ∊ F2.1<sup>+</sup>?<br /></a>
            <a>A<sup>+</sup><sub>F2.1</sub> = &#123;A, C&#125;<br /></a>
            <a>D ∉ A<sup>+</sup><sub>F2.1</sub> ⇒ A → D ∉ F2.1<sub>+</sub><br /></a>
            <a>Отже, A → D не можна викинути.<br /></a>
            <a><br /></a>

            <a>2) F2.2 = &#123; A → D, B → C, BD → C &#125;<br /></a>
            <a>F1<sup>+</sup> ~ F2.2<sup>+</sup>: ❌<br /></a>
            <a><br /></a>
            <a>F2.2<sup>+</sup> ⊆ F1<sup>+</sup> ✔️ (очевидно)<br /></a>
            <a>F1<sup>+</sup> ⊆ F2.2<sup>+</sup> ❌<br /></a>
            <a>Чи A → C ∊ F2.2<sup>+</sup>?<br /></a>
            <a>A<sup>+</sup><sub>F2.2</sub> = &#123;A, D&#125;<br /></a>
            <a>C ∉ A<sup>+</sup><sub>F2.2</sub> ⇒ A → C ∉ F2.2<sub>+</sub><br /></a>
            <a>Отже, A → C не можна викинути.<br /></a>
            <a><br /></a>

            <a>3) F2.3 = &#123; A → D, A → C, BD → C &#125;<br /></a>
            <a>F1<sup>+</sup> ~ F2.3<sup>+</sup>: ❌<br /></a>
            <a><br /></a>
            <a>F2.3<sup>+</sup> ⊆ F1<sup>+</sup> ✔️ (очевидно)<br /></a>
            <a>F1<sup>+</sup> ⊆ F2.3<sup>+</sup> ❌<br /></a>
            <a>Чи B → C ∊ F2.3<sup>+</sup>?<br /></a>
            <a>B<sup>+</sup><sub>F2.3</sub> = &#123;B&#125;<br /></a>
            <a>C ∉ B<sup>+</sup><sub>F2.3</sub> ⇒ B → C ∉ F2.3<sub>+</sub><br /></a>
            <a>Отже, B → C не можна викинути.<br /></a>
            <a><br /></a>

            <a>4) F2.4 = &#123; A → D, A → C, B → C &#125;<br /></a>
            <a>F1<sup>+</sup> ~ F2.4<sup>+</sup>: ✔️<br /></a>
            <a><br /></a>
            <a>F2.4<sup>+</sup> ⊆ F1<sup>+</sup> ✔️ (очевидно)<br /></a>
            <a>F1<sup>+</sup> ⊆ F2.4<sup>+</sup> ✔️<br /></a>
            <a>Чи BD → C ∊ F2.4<sup>+</sup>?<br /></a>
            <a>(B, D)<sup>+</sup><sub>F2.4</sub> = &#123;B, D, C&#125;<br /></a>
            <a>C ∊ (B,D)<sup>+</sup><sub>F2.4</sub> ⇒ BD → C ∊ F2.4<sub>+</sub><br /></a>
            <a>Отже, BD → C можна викинути.<br /></a>
            <a><br /></a>

            <a>F2 = &#123;A → D, A → C, B → C&#125;<br /></a>
            <a><br /></a>

            <a>III. Антинадлишковість зліва<br /></a>
            <a>У даній множині функціональних залежностей немає залежностей, де ліва частина має більше одного атрибуту, але якщо така є, то потрібно перевірити її кожен атрибут зліва, чи не можна вилучити жодного атрибута, не втративши еквівалентності з F, тобто чи поточна множина ФЗ є еквівалентна такій ж множині без цього атрибуту у поточній залежності.<br /></a>
            <a><br /></a>

            <a>Якщо після кроку 3 було змінено певну ФЗ, тоді потрібно знову зробити крок 2, і якщо після нього було видалено певну ФЗ, тоді потрібно знову зробити крок 3, і так далі.</a>
            <a><br /></a>

            <h3>F<sub>min</sub> = &#123;A → D, A → C, B → C&#125; </h3>

            <a><b>2. Знайдемо квазіключ:</b><br /></a>
            <a>Виписуємо всі атрибути і викреслюємо ті, які є справа залежностей: A B <s>C</s> <s>D</s>.<br /></a>
            <a>Перевіряємо, яка комбінація цих атрибутів (або один з них) є квазіключем (для квазіключа повина виконуватися умова мінімальності):<br /></a>
            <a>A<sup>+</sup><sub>F<sub>min</sub></sub> = &#123;A, C, D&#125; ⇒ B ∉ A<sup>+</sup><sub>F<sub>min</sub></sub><br /></a>
            <a>B<sup>+</sup><sub>F<sub>min</sub></sub> = &#123;B, C&#125; ⇒ A, D ∉ A<sup>+</sup><sub>F<sub>min</sub></sub><br /></a>
            <a>(A, B)<sup>+</sup><sub>F<sub>min</sub></sub> = &#123;A, B, C, D&#125; ⇒ AB (суперключ)<br /></a>
            <a>Отже, <b>AB</b> є квазіключем.<br /></a>
            <a><br /></a>

            <a><b>3. Знайдемо 3 нормальну форму:</b><br /></a>
            <a><br /></a>
            <img src={require("./3nf.jpg")} alt="3NF" /><br />
            <a><br /></a>

            <a><b>4. Перевіримо властивість з’єднання без втрат:</b><br /></a>
            <a><br /></a>
            <table style={tableStyle}>
                <thead> <tr>
                    <th style={thStyle}>A</th>
                    <th style={thStyle}>B</th>
                    <th style={thStyle}>C</th>
                    <th style={thStyle}>D</th>
                    </tr>
                </thead>
                <tbody>  <tr>
                    <td style={tdStyle}>a1</td>
                    <td style={tdStyle}>b12</td>
                    <td style={tdStyle}>a3</td>
                    <td style={tdStyle}><a style={{backgroundColor: "green"}}>a4</a>b14</td>
                    </tr>
                    <tr>
                    <td style={tdStyle}>a1</td>
                    <td style={tdStyle}>b22</td>
                    <td style={tdStyle}><a style={{backgroundColor: "yellow"}}>a3</a>b23</td>
                    <td style={tdStyle}>a4</td>
                    </tr>
                    <tr>
                    <td style={tdStyle}>a1</td>
                    <td style={tdStyle}>a2</td>
                    <td style={tdStyle}><a style={{backgroundColor: "yellow"}}>a3</a>b33</td>
                    <td style={tdStyle}><a style={{backgroundColor: "green"}}>a4</a>b34</td>
                    </tr>
                </tbody>
            </table>
            <a><br /></a>
            <a>1) <b style={{backgroundColor: "yellow"}}>A → C</b> в рядках R1, R2, R3 ототожнюємо в стовпчику C до символу a3</a><br />
            <a><br /></a>
            <a>2) <b style={{backgroundColor: "green"}}>A → D</b> в рядках R1, R2, R3 ототожнюємо в стовпчику C до символу a4</a><br />
            <a><br /></a>
            <a>R3 складається з усіх символів а ⇒ алгоритм припинено, та декомпозиція задовільняє властивості з’єднання без втрат.</a><br />
            <a><br /></a>
            <a><br /></a>

            <a><b>5. Перевіримо властивість збереження залежностей:</b><br /></a>
            <a><br /></a>
            <a>F<sub>min</sub> = &#123;A → D, A → C, B → C&#125; </a><br />
            <a>1. Побудова проекції F<sub>min</sub> на множини атрибутів F1, F2</a><br />
            <a>R1(<u>A</u>, C), F1 = F[A, C] = &#123; A → C&#125; ⋃ T</a><br />
            <a>R2(<u>A</u>, D), F2 = F[A, D] = &#123; A → D&#125; ⋃ T</a><br />
            <a>R3(<u>A</u>, B)</a><br />
            <a>2. F<sup>+</sup><sub>min</sub> ⊆ (F1 ⋃ F2)<sup>+</sup> = (&#123; A → C, A → D &#125; ⋃ T)<sup>+</sup>  : B → C ⋲ (F1 ⋃ F2)<sup>+</sup> <b>?</b></a><br />
            <a>B<sup>+</sup> ⋃ = &#123;B&#125; ⇒ C ∉ B<sup>+</sup> ⋃ ⇒ B → C ∉ (F1 ⋃ F2)<sup>+</sup></a><br />
            <a>Отже, властивість збереження залежностей не виконується.</a><br />

        </div>
    );
};

export default AboutPageInfo;
