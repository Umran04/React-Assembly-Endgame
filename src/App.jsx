import React from "react";
import { useState } from "react";
import { languages } from './languages.js'

export default function App(){

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const keyboard = alphabet.split("").map((letter) => {
        return <button className="keyboard--letters">{letter.toUpperCase()}</button>}
    )
    const [currentWord,setCurrentWord] = useState('react')

    const letters = currentWord.split('').map((letter) => { 
        return <span className="letters">{letter.toUpperCase()}</span>
    })
   

    const languageList = languages.map( (language) => { return <span className="chips" key={language.name} 
        style={ {backgroundColor: language.backgroundColor, color:language.color}}>
        {language.name}
        </span>
        
    })


    return(
    <main>
        <header>
            <h1>Assembly Endgame</h1>
            <p>Guess the words within 8 attempts to keep the programming languages safe from assembly</p>
        </header>

        <section className="game--status">
            <h2>You win</h2>
            <p> Well done</p>
        </section>
        
        <section className="language--section">{languageList}</section>

        <section className="letters--container">{letters}</section>

        <section className="keyboard">{keyboard}</section>
    </main>
    )
}