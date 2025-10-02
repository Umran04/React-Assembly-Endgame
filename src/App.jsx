import React from "react";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { languages } from './languages.js'

export default function App(){

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const [currentWord,setCurrentWord] = useState('react')
    const [userGuessLetter,setUserGuessLetter] = useState([])
    

    
    
    
    const languageList = languages.map( (language) => { return <span className="chips" key={language.name} 
    style={ {backgroundColor: language.backgroundColor, color:language.color}}>
    {language.name}
    </span>
    })

    function correctlyGuessedLetter(letter){
        if(userGuessLetter.includes(letter) && currentWord.includes(letter)){
            return true
        }
    }
    
    const letters = currentWord.split('').map((letter) => { 
        return <span className="letters">{ correctlyGuessedLetter(letter) && letter.toUpperCase()}</span>
    })

    
    const keyboard = alphabet.split("").map((letter) => {
        //cant write notes next to clsx stuff but this basically meanes, line 1 is just default keyboard--letters classname
        //line 2 is if the letter has been guessed and is in the word then make the letter green (.correct css class)
        //line 3 if the letter has been guessed and is not in the word then make it red (.wrong css class)
        return <button onClick={() => userClick(letter)} className={clsx(
            "keyboard--letters",
            userGuessLetter.includes(letter) && currentWord.includes(letter) && "Correct",
            userGuessLetter.includes(letter) && !currentWord.includes(letter) && "Wrong")}>
            
            {letter.toUpperCase()} 
            </button>
        }
    )

    function userClick(newLetter){
        setUserGuessLetter(prevLetter =>
            prevLetter.includes(newLetter) ? prevLetter : [...prevLetter, newLetter] //checks if the letter is already in  the arr, if yes then it will NOT add it
        )
    
    }

    //  useEffect(() => {
    //     console.log('User guesses the letter ' + userGuessLetter)
    //  }, [userGuessLetter])



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

        <button className="newGame--btn">New Game</button>
    </main>
    )
}