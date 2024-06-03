import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, backdropClasses } from '@mui/material';
import axios from 'axios';
import "../styles/styles.css";

const toolPageText = {
    border: "0.5rem 2rem",
    background: "linear-gradient(90deg, rgba(129,121,252,1) 0%, rgba(192,139,217,1) 100%)",
    padding: "2rem",
    fontFamily: '"Source Sans 3"',
    fontSize: 24
};

const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(16,11,97,1) 0%, rgba(6,13,66,1) 38%, rgba(62,22,77,1) 65%, rgba(73,19,98,1) 100%)',
    color: 'white',
    fontFamily: '"Source Sans 3"',
    fontWeight: "400",
    fontSize: 18,
    padding: "1rem",
    margin: "2rem"
}

const textFieldAttrs = {
    width: "28%",
    padding: "0rem 0rem 3rem 0rem",
    margin: "1rem 0rem 0rem 0rem",
    fontFamily: "Source Sans 3",
    fontWeight: "light"
}

const textFieldPairContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0rem 0rem 1rem 0rem",
    fontFamily: "Source Sans 3",
    fontWeight: "light",
    position: 'relative'
}

const textFieldPairAttrs = {
    // display: 'flex',
    // alignItems: 'center',
    width: "100%",
    display: "table",
    padding: "1rem 0rem 0rem 0rem"
}

const deleteButton = {
    display: 'inline-block',
    padding: "1rem 0rem 1rem 0rem",
}

const textStyle = {
    fontFamily: "Source Sans 3",
    fontWeight: "light",
    padding: "1rem 0rem 0rem 0rem"
}

const textAnswerStyle = {
    fontFamily: "Source Sans 3",
    padding: "1rem 0rem 0rem 0rem",
    fontSize: 30
}

const textDeleteButtonColor = {
    color: "black"
}

const answerContainer = {
    border: "2px",
    borderRadius: "10px",
    padding: "2rem",
    margin: "2rem",
    background: "linear-gradient(90deg, rgba(16,11,97,1) 0%, rgba(6,13,66,1) 38%, rgba(62,22,77,1) 65%, rgba(73,19,98,1) 100%)",
    color: "white"
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

const highlightedRowStyle = {
    background: "rgba(100,100,100,0.8)"
}

const ToolPageInfo = () => {
    const [attributes, setAttributes] = useState('');
    const [dependencies, setDependencies] = useState([{ left: '', right: '' }]);
    const [minimalFDs, setMinimalFDs] = useState('');
    const [threeNF, setThreeNF] = useState('');
    const [lossless, setLossless] = useState('')
    const [preserve, setPreserve] = useState('')
    const [screenCleared, setScreenCleared] = useState(false);

    const handleAddDependency = () => {
        setDependencies([...dependencies, { left: '', right: '' }]);
    };

    const handleDeleteDependency = (index) => {
        if (dependencies.length === 1) return;
        const newDependencies = [...dependencies];
        newDependencies.splice(index, 1);
        setDependencies(newDependencies);
    };

    const handleInputChange = (index, event, type) => {
        const newDependencies = [...dependencies];
        if (type === 'left') {
            newDependencies[index].left = event.target.value;
        } else {
            newDependencies[index].right = event.target.value;
        }
        setDependencies(newDependencies);
    };

    const handleFindMinimalFDs = async () => {
        try {
            const response = await axios.post('http://localhost:8888/calc/min', {
                attributes: attributes.split(',').map(attr => attr.trim()),
                xs: dependencies.map(left => left.left.split(',').map(attr => attr.trim())),
                ys: dependencies.map(right => right.right.split(',').map(attr => attr.trim()))
            });
            console.log(response)
            setMinimalFDs(response.data);
            setThreeNF('');
            setLossless('')
            setPreserve('')
            if (response.status == 404) throw Error
        } catch (error) {
            alert('Неправильно введено дані. Перевірте їх.');
        }
    };

    const handleFind3NF = async () => {
        try {
            const response = await axios.post('http://localhost:8888/calc/nf', {
                attributes: attributes.split(',').map(attr => attr.trim()),
                xs: dependencies.map(left => left.left.split(',').map(attr => attr.trim())),
                ys: dependencies.map(right => right.right.split(',').map(attr => attr.trim()))
            });
            setThreeNF(response.data);
            setMinimalFDs('');
            setLossless('')
            setPreserve('')
        } catch (error) {
            alert('Неправильно введено дані. Перевірте їх.');
        }
    };

    const handleCheckLosslessConnection = async () => {
        try {
            const response = await axios.post('http://localhost:8888/calc/lossless', {
                attributes: attributes.split(',').map(attr => attr.trim()),
                xs: dependencies.map(left => left.left.split(',').map(attr => attr.trim())),
                ys: dependencies.map(right => right.right.split(',').map(attr => attr.trim()))
            });
            setThreeNF('');
            setMinimalFDs('');
            setLossless(response.data)
            setPreserve('')
        } catch (error) {
            alert('Неправильно введено дані. Перевірте їх.');
        }
    }

    const handleCheckDepsPreserving = async () => {
        try {
            const response = await axios.post('http://localhost:8888/calc/preserve', {
                attributes: attributes.split(',').map(attr => attr.trim()),
                xs: dependencies.map(left => left.left.split(',').map(attr => attr.trim())),
                ys: dependencies.map(right => right.right.split(',').map(attr => attr.trim()))
            });
            setThreeNF('');
            setMinimalFDs('');
            setLossless('')
            setPreserve(response.data)
            console.log(response.data)
        } catch (error) {
            alert('Неправильно введено дані. Перевірте їх.');
        }
    }

    const handleClearScreen = () => {
        // setAttributes('');
        // setDependencies([{ left: '', right: '' }]);
        setMinimalFDs('');
        setThreeNF('');
        setLossless('')
        setPreserve('')
        setScreenCleared(true);
    };

    return (
        <div>
            <div style={toolPageText}>
                <h1>Нормалізація БД</h1>

                <Typography variant="subtitle1" gutterBottom style={textStyle}>
                    Введіть атрибути через кому (приклад: A, B, C) в будь-якому регістрі:
                </Typography>
                <TextField
                    label="Введіть атрибути БД"
                    fullWidth
                    variant="outlined"
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                    style={textFieldAttrs}
                />

                <Typography variant="subtitle1" gutterBottom style={textStyle}>
                    Введіть функціональні залежності через кому (приклад: A, B) в будь-якому регістрі:
                </Typography>

                {dependencies.map((dependency, index) => (
                    <div key={index}>
                        <div style={textFieldPairAttrs}>
                            <TextField
                                label="Лівий атрибут"
                                value={dependency.left}
                                onChange={(e) => handleInputChange(index, e, 'left')}
                                variant="outlined"
                            />
                            <Typography variant="h5" display="inline" style={{ margin: '0 1rem', padding: "1rem 0 0 0" }}>&#8594;</Typography>
                            <TextField
                                label="Правий атрибут"
                                value={dependency.right}
                                onChange={(e) => handleInputChange(index, e, 'right')}
                                variant="outlined"
                            />
                        </div>
                        <div style={deleteButton}>
                            {dependencies.length > 1 && (
                                <Button onClick={() => handleDeleteDependency(index)} style={textDeleteButtonColor}>X</Button>
                            )}
                        </div>
                    </div>
                ))}
                <Button onClick={handleAddDependency} style={buttonStyle}>Додати нову функціональну залежність</Button>

                <div>
                    <Button onClick={handleFindMinimalFDs} style={buttonStyle}>Знайти мінімальну множину ФЗ</Button>
                    <Button onClick={handleFind3NF} style={buttonStyle}>Знайти 3НФ</Button>
                    <Button onClick={handleClearScreen} style={buttonStyle}>Очистити екран</Button>
                </div>

                <div>
                    <Button onClick={handleCheckLosslessConnection} style={buttonStyle}>Перевірити 3НФ на властивість з'єднання без втрат</Button>
                    <Button onClick={handleCheckDepsPreserving} style={buttonStyle}>Перевірити 3НФ на властивість збереження залежностей</Button>
                </div>

                <div style={answerContainer}>
                    {minimalFDs && (
                        <Typography variant="body1" style={textAnswerStyle}>{minimalFDs.replaceAll(",", ", ")}</Typography>
                    )}
                    {threeNF && (
                        <div>
                            {threeNF.map((item, index) => (
                                <Typography key={index} variant="body1" style={textAnswerStyle}>{JSON.stringify(item).replaceAll("\"", "")}</Typography>
                            ))}
                        </div>
                    )}
                    {screenCleared && (
                        <Typography variant="body1" style={textAnswerStyle}></Typography>
                    )}
                    {lossless && (
                        <div>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        {lossless[0].map((cell, index) => (
                                            <th key={index} style={thStyle}>{cell}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {lossless.slice(1).map((row, rowIndex) => {
                                        const isHighlighted = row.slice(1).every(cell => cell.includes('a'));
                                        return (
                                            <tr key={rowIndex} style={isHighlighted ? highlightedRowStyle : {}}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} style={tdStyle}>{cell}</td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {lossless.slice(1).some(row => row.slice(1).every(cell => cell.includes('a'))) ? (
                                <Typography variant="body1" style={textAnswerStyle}>
                                    {`R${lossless.slice(1).findIndex(row => row.slice(1).every(cell => cell.includes('a'))) + 1} 
                                    складається з усіх символів 'a', тому алгоритм припинено та декомпозиція `} <b style={{color:'yellow'}}>задовольняє</b> властивості з’єднання без втрат
                                </Typography>
                            ) : (
                                <Typography variant="body1" style={textAnswerStyle}>Властивість з’єднання без втрат <b>не виконується</b></Typography>
                            )}
                        </div>
                    )}
                    {preserve && (
                        <div>
                            <Typography variant="body1" style={textAnswerStyle}><b>Мінімальна множина ФЗ: </b>{JSON.stringify(preserve.minimalCover).replaceAll(",", ", ").replaceAll("\"", "")}</Typography>
                            <div>
                            <Typography variant="body1" style={textAnswerStyle}><b>Реляції 3НФ:</b></Typography>
                                {preserve.relations && preserve.relations.map((item, index) => (
                                    <Typography key={index} variant="body1" style={textAnswerStyle}>{JSON.stringify(item).replaceAll("\"", "")}</Typography>
                                ))}
                            </div>
                            <Typography variant="body1" style={textAnswerStyle}></Typography>
                            <Typography variant="body1" style={textAnswerStyle}></Typography>
                            <Typography variant="body1" style={textAnswerStyle}>Побудова проекції F<sub>min</sub> на множини атрибутів: </Typography>
                            <div>
                                {preserve.relationObjects && preserve.relationObjects.map((item, index) => (
                                    <Typography key={index} variant="body1" style={textAnswerStyle}>
                                        {`R${index + 1} (${item.attributes}), первинний ключ = ${item.quasikey.toString().replaceAll(",", "")}
                                        ${(!item.deps.length == 0) ? `, F${index + 1} = F[${item.attributes}] = {${item.deps.toString()}} ⋃ T ` : ""}`}
                                    </Typography>
                                ))}
                            </div>
                            <Typography variant="body1" style={textAnswerStyle}></Typography>
                            <div>
                                {preserve.solution && preserve.solution.map((item, index) => (
                                    (item.ifIsCover && preserve.solution.length == 1) ? 
                                        <Typography variant="body1" style={textAnswerStyle}>
                                        F<sup>+</sup><sub>min</sub> ⊆ (⋃F)<sup>+</sup> = {`({${item.deps}}`} ⋃ T)<sup>+</sup> ⊆ (⋃F)<sup>+</sup> <br />
                                        Отже, властивість збереження залежностей <b>{(!item.ifIsCover) ? " не " : ""}</b> <b>виконується</b>.
                                    </Typography>
                                    :
                                    <Typography variant="body1" style={textAnswerStyle}>
                                        F<sup>+</sup><sub>min</sub> ⊆ (⋃F)<sup>+</sup> = {`({${item.includedDeps}}`} ⋃ T)<sup>+</sup> : 
                                        {` {${item.unincludedDeps}}`} ∈ (⋃F)<sup>+</sup> ? <br />
                                        <b>{`{${item.dep}}`}</b> <br />
                                        {`{${item.dep.split(' →')[0]}}`}<sup>+</sup><sub>⋃</sub> = {`{${item.cover.toString()}}`} ⇒ {`{${item.dep.split(' →')[1].replace(" ", "")}}`} <a>{(!item.ifIsCover) ? " ∉ " : " ⋲ "}</a> {`{${item.dep.split(' →')[0]}}`} <sup>+</sup><sub>⋃</sub> ⇒ {`{${item.dep}}`} <a>{(!item.ifIsCover) ? " ∉ " : " ⋲ "}</a> (⋃F)<sup>+</sup><br />
                                        Отже, властивість збереження залежностей <b>{(!item.ifIsCover) ? " не " : ""}</b> <b>виконується</b>.
                                    </Typography>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ToolPageInfo;
