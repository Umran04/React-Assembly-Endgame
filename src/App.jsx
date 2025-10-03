import React from "react";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { languages } from './languages.js'

export default function App(){

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const [currentWord,setCurrentWord] = useState('loop')
    const [userGuessLetter,setUserGuessLetter] = useState([])

    
    //get the number of wrong guesses byt filtering out the letters guessed which ARE not in the word
    //then use .length to show how many wrong guesses there has been 
    const wrongGuessCount = userGuessLetter.filter(letter => !currentWord.includes(letter)).length
    const isGameLost = wrongGuessCount === languages.length - 1 // checks length of language array so dynamicaly calcs how many wrong guesses are allowed 
    
    

    // logic to see if the guessed letters includes the current words letters
    const isGameWon = currentWord.split("").every(letter => userGuessLetter.includes(letter)) 
    let isGameOver = false
    if( isGameLost || isGameWon){ 
        isGameOver = true
    }

    
    
    /*LANGUAGE LIST*/
    const languageList = languages.map( (language, index) => { 
    
    const isLost = index < wrongGuessCount
    const className = clsx("chips", isLost && "lost") // another way of using clsx
    //adds lost css class name if the index of languages is less than wrong guess count
    
    //HOW THIS WORKS: .map means it goes thru each element in the array
    //say for e.g if we are at index 0 and wrong guess count is 0, that means 0 is not less than 0 so lost will NOT be added
    //now if index is 0 and WGC is 1, since 0 < 1 lost will be applied, then it will move thru the array again
    //1 < 1 ? no so only index 0 will have the lost applied, same goes for 2 to 8.
    //WGC = 5, will go through array until index is at 5 etc.

    return <span className={className} key={language.name} 
    style={ {backgroundColor: language.backgroundColor, color:language.color}}>
    {language.name}
    </span>
    })

    /*THE WORD / LETTERS TO BE DISPLAYED IF GUESSED CORRECTLY*/
    const letters = currentWord.split('').map((letter) => { 
        return <span className="letters">{ userGuessLetter.includes(letter) && letter.toUpperCase()}</span>
    })

    /*KEYBOARD*/
    const keyboard = alphabet.split("").map((letter) => {
        
        
        
        const isCorrect = userGuessLetter.includes(letter) && currentWord.includes(letter)
        const isWrong = userGuessLetter.includes(letter) && !currentWord.includes(letter)
        //checking which guesses are correct and wrong
        
        const className = clsx("keyboard--letters", { correct : isCorrect , wrong : isWrong})
        //base case have keyboard--letters, 
        //based on correct or incorrect guesses apply the class name to change its style
       
        
        return <button onClick={() => userClick(letter)}
            className={className}>
            {letter.toUpperCase()} 
            </button>
        }
    )

    /* FUNCTINOALITY THAT FOR KEYBOARD BUTTON CLICK*/
    function userClick(newLetter){
        setUserGuessLetter(prevLetter =>
            prevLetter.includes(newLetter) ? prevLetter : [...prevLetter, newLetter] //checks if the letter is already in  the arr, if yes then it will NOT add it
        )
    
    }

    /* CONDITIONS TO DISPLAY THE STATUS IF GAME IS WON OR LOST */
    let gameStatusH = ''
    let gameStatusP = ''

    if(isGameOver && isGameWon){
        gameStatusH = 'You Win!'
        gameStatusP = 'Well Done'
    }
    else if(isGameOver && isGameLost){
        gameStatusH = 'Game Over'
        gameStatusP = 'You Lose! Better start learning assembly'
    }else{}



    return(
    <main>
        <header>
            <h1>Assembly Endgame</h1>
            <p>Guess the words within {languages.length - 1} attempts to keep the programming languages safe from assembly</p>
        </header>

        <section className={clsx("game--status",{lost: isGameLost, won: isGameWon})}>
            {isGameOver && <h2>{gameStatusH}</h2>}
            {isGameOver && <p>{gameStatusP}</p>}
        </section>
        
        <section className="language--section">{languageList}</section>

        <section className="letters--container">{letters}</section>

        <section className="keyboard">{keyboard}</section>

        {isGameOver && <button className="newGame--btn">New Game</button>}
    </main>
    )
}