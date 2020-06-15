import React, { useState } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.scss'

import { Bar } from 'react-chartjs-2';


const App = () => {
    // variant 15: VII, Gamma, II; B Dunn 1-2-2
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    // VII
    const [rotorL, setRotorL] = useState({
        arr: 'NZJHGRCXMYSWBOUFAIVLPEKQDT'.split(''),
        state: 0
    })
    const rotorLcopy = 'NZJHGRCXMYSWBOUFAIVLPEKQDT'.split('')
    // Gamma
    const [rotorM, setRotorM] = useState({
        arr: 'FSOKANUERHMBTIYCWLQPZXVGJD'.split(''),
        state: 0
    })
    const rotorMcopy = 'FSOKANUERHMBTIYCWLQPZXVGJD'.split('')
    // II
    const [rotorR, setRotorR] = useState({
        arr: 'AJDKSIRUXBLHWTMCQGZNPYFVOE'.split(''),
        state: 0
    })
    const rotorRcopy = 'AJDKSIRUXBLHWTMCQGZNPYFVOE'.split('')

    // Reflector B Dunn
    const reflector = new Map([
        ['A', 'E'],
        ['B', 'N'],
        ['C', 'K'],
        ['D', 'Q'],
        ['F', 'U'],
        ['G', 'Y'],
        ['H', 'W'],
        ['I', 'J'],
        ['L', 'O'],
        ['M', 'P'],
        ['R', 'X'],
        ['S', 'Z'],
        ['T', 'V'],
    ])

    const rotorLOffset = 1 + 1
    const rotorMOffset = 2 + 1
    const rotorROffset = 2 + 1

    const [inputText, setInputText] = useState('')
    const [resultText, setResultText] = useState('')
    const [pressedButton, setPressedButton] = useState('')
    const [resSym, setResSym] = useState('')

    const [curRotorL, setCurRotorL] = useState('')
    const [curRotorM, setCurRotorM] = useState('')
    const [curRotorR, setCurRotorR] = useState('')
    const [curRotorLBack, setCurRotorLBack] = useState('')
    const [curRotorMBack, setCurRotorMBack] = useState('')
    const [curRotorRBack, setCurRotorRBack] = useState('')

    const inputTextHandler = (e) => {
        const input = e.target.value.toUpperCase();
        if (input.split('').every(symbol => alphabet.includes(symbol))) {
            setInputText(input)
        }
    }

    const keyDownHandler = (key) => {
        setPressedButton(key)
        setInputText(inputText + key)
        calcResultSymbol(key)
    }

    const calcResultSymbol = (key) => {
        const pressedIndex = alphabet.indexOf(key)

        setCurRotorR(rotorR.arr[pressedIndex])
        const cRotorR = rotorR.arr[pressedIndex]
        const cRotorM = rotorM.arr[alphabet.indexOf(rotorR.arr[pressedIndex])]
        const cRotorL = rotorL.arr[alphabet.indexOf(cRotorM)]
        setCurRotorM(cRotorM)
        setCurRotorL(cRotorL)


        let cRotorLBack = ''
        if ([...reflector.keys()].find(key => key === cRotorL)) {
            cRotorLBack = reflector.get(cRotorL)
        } else {
            cRotorLBack = [...reflector].find(([key, value]) => cRotorL === value)[0]
        }
        setCurRotorLBack(cRotorLBack)

        const cRotorMBack = alphabet[rotorL.arr.indexOf(cRotorLBack)]
        setCurRotorMBack(cRotorMBack)

        const cRotorRBack = alphabet[rotorM.arr.indexOf(cRotorMBack)]
        setCurRotorRBack(cRotorRBack)

        const resButton = alphabet[rotorR.arr.indexOf(cRotorRBack)]
        setResSym(resButton)
        setResultText(resultText + resButton)
        console.log(rotorLOffset + rotorL.state)
        console.log(rotorMOffset + rotorM.state)
        console.log(rotorROffset + rotorR.state)

        if (rotorR.state + rotorROffset < rotorR.arr.length) {
            setRotorR({ arr: rotorRcopy.splice(-rotorR.state - rotorROffset).concat(rotorRcopy), state: rotorR.state + rotorROffset })
            setRotorM({ ...rotorM })
            setRotorL({ ...rotorL })
        } else if (rotorM.state + rotorMOffset < rotorM.arr.length) {
            setRotorR({ arr: rotorRcopy, state: 0 })
            setRotorM({ arr: rotorMcopy.splice(-rotorM.state - rotorMOffset).concat(rotorMcopy), state: rotorM.state + rotorMOffset })
            setRotorL({ ...rotorL })
        } else if (rotorL.state + rotorLOffset < rotorL.arr.length) {
            setRotorR({ arr: rotorRcopy, state: 0 })
            setRotorM({ arr: rotorMcopy, state: 0 })
            setRotorL({ arr: rotorLcopy.splice(-rotorL.state - rotorLOffset).concat(rotorLcopy), state: rotorL.state + rotorLOffset })
        } else {
            setRotorR({ arr: rotorRcopy, state: 0 })
            setRotorM({ arr: rotorMcopy, state: 0 })
            setRotorL({ arr: rotorLcopy, state: 0 })
        }

        return resultText + resButton
    }

    const printHistogram = (text) => {
        const resu = []
        let symbolCountMap = new Map();

        text.split('').forEach(symbol => {
            if (symbolCountMap.has(symbol)) {
                let oldValue = symbolCountMap.get(symbol)
                symbolCountMap.set(symbol, ++oldValue)
            } else {
                symbolCountMap.set(symbol, 1)
            }
        })

        console.log(symbolCountMap);

        let length = text.length;
        symbolCountMap.forEach((value, key) => {
            const sharpAmount = (value / length * 100)
            resu.push(sharpAmount)
        })

        return resu
    }

    const data1 = {
        labels: inputText.split('').filter((value, index, self) => {
            return self.indexOf(value) === index;
        }),
        datasets: [
            {
                label: 'Original Text',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: printHistogram(inputText)
            }
        ]
    };

    const data2 = {
        labels: resultText.split('').filter((value, index, self) => {
            return self.indexOf(value) === index;
        }),
        datasets: [
            {
                label: 'Encrypted Text',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: printHistogram(resultText)
            }
        ]
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">

                        <div className="row">
                            {
                                alphabet.map((symbol, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn p-1 m-1 ${resSym === symbol ? 'btn-success' : null}`} onClick={e => keyDownHandler(symbol)}>{symbol}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                alphabet.map((symbol, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn p-1 m-1 ${pressedButton === symbol ? 'btn-danger' : 'btn-primary'}`} onClick={e => keyDownHandler(symbol)}>{symbol}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                rotorR.arr.map((symbol, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn btn-${curRotorR === symbol ? 'danger' : curRotorRBack === symbol ? 'success' : 'secondary'} p-1 m-1`} onClick={e => keyDownHandler(symbol)}>
                                                {symbol}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                rotorM.arr.map((symbol, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn btn-${curRotorM === symbol ? 'danger' : curRotorMBack === symbol ? 'success' : 'secondary'} p-1 m-1`} onClick={e => keyDownHandler(symbol)}>{symbol}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                rotorL.arr.map((symbol, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn btn-${curRotorL === symbol ? 'danger' : curRotorLBack === symbol ? 'success' : 'secondary'} p-1 m-1`} onClick={e => keyDownHandler(symbol)}>{symbol}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            {
                                [...reflector.keys()].map((key, i) => {
                                    return (
                                        <div key={i} className="col p-0">
                                            <button className={`btn btn-${curRotorL === key || curRotorL === reflector.get(key) ? 'danger' : 'secondary'} p-1 m-1`} >{`${key}-${reflector.get(key)}`}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="chart">
                                    <Bar
                                        data={data1}
                                        width={100}
                                        height={50}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="chart">
                                    <Bar
                                        data={data2}
                                        width={100}
                                        height={50}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> {/* .col */}
                    <div className="col-4">

                        <div className="row">
                            <div className="col">
                                <h5>Result: </h5>
                                <p>{resultText}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h5>Input: </h5>
                                <p>{inputText}</p>
                            </div>
                        </div>
                        <div className="row">
                            <input
                                value={inputText}
                                type="text"
                                onChange={(e) => inputTextHandler(e)}
                                disabled
                            />
                        </div>

                    </div> {/* .col */}
                </div> {/* .row */}
            </div>

            <KeyboardEventHandler
                handleKeys={'qwertyuiopasdfghjklzxcvbnm'.split('')}
                onKeyEvent={(key, e) => keyDownHandler(key.toUpperCase())}
            />
        </>
    )
}

export default App
