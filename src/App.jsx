import React from "react";
import { languages } from './languages.js'

export default function App(){

    console.log(languages)
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
    </main>
    )
}