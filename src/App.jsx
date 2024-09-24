import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./index.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setrollCount] = useState(0);
  const [lowestRoll, setlowestRoll] = useState(() => {
    return JSON.parse(localStorage.getItem("lowestRoll")) || null;
  }); //stores the lowest from localStorage

  //randomly genereates 10 numbers between 1 to 6
  function generateNewRandomDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  //using array of objects  to push all the generated random numbers
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewRandomDice());
    }
    return newDice;
  }

  //its hold the number that is clicked
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  //it re-rolls the dice without refreshing the page and holding the holdDice(id)
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewRandomDice();
        })
      );
      setrollCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setrollCount(0);
    }
  }

  function resetGame() {
    localStorage.removeItem("lowestRoll");
    setlowestRoll(null);
    setDice(allNewDice());
    setTenzies(false);
    setrollCount(0);
  }

  //seperate mapping for clear code, further implemented in jsx {diceElements}
  const diceElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ));

  //useEffect to check if the user won the game or not (all dice are held and have same value)
  useEffect(() => {
    //check all dice are held
    const allHeldDice = dice.every((die) => die.isHeld);

    //get the value of first die
    const firstDieValue = dice[0].value;

    //check if all the dice have same value
    const allSameDiceValue = dice.every((die) => die.value === firstDieValue);

    //condition && if all helds and all value are same) play won the game
    if (allHeldDice && allSameDiceValue) {
      setTenzies(true);

      //check if the roll count is less than the lowest roll count
      if (lowestRoll === null || rollCount < lowestRoll) {
        setlowestRoll(rollCount);
        localStorage.setItem("lowestRoll", JSON.stringify(rollCount)); //stores the new lowest record
      }
    }
  }, [dice, rollCount, lowestRoll]);

  return (
    <section className="app--section w-full h-[100vh] sm:p-2 p-4 md:p-10 text-center m-auto flex justify-center items-center overflow-hidden">
      {tenzies && <Confetti />}
      <div className="app--container relative md:w-2/3 sm:w-full w-full bg-zinc-100 h-full rounded-lg items-center justify-center flex flex-col">
        <div className="score--board text-center min-w-56 rounded-md absolute bottom-6 left-1/2 -translate-x-1/2 bg-lime-100 py-3 px-4 uppercase tracking-tighter font-bold font-mono border-2 border-dashed border-orange-500">
          {(rollCount > 0) ? <h1 className="roll--count ">Dice rolled : {rollCount} times</h1> : "Try Your luck!" } 
          <h1>LOWEST RECORD: {lowestRoll !== null ? lowestRoll : "0"} TIMES </h1>
        </div>

        <h1 className="text-[1.5rem] text-green-500 capitalize italic">
          {tenzies && <h2>Congratulations, You won the game!</h2>}
        </h1>
        <h1 className="text-[2.5rem] font-mono">Tenzies Game!</h1>
        <p>"Roll the Dice, Match the Numbers, and Race to Victory!"</p>
        <div className="app-dice--container grid grid-cols-5 gap-3 md:gap-6 lg:gap-6 my-8">
          {diceElements}
        </div>

        <div className="button--conatiner gap-3 flex">
          <button
            onClick={resetGame}
            className="reset--game-btn uppercase tracking-wide font-semibold bg-gradient-to-r from-zinc-700 to-zinc-500 text-white py-2 px-5 rounded-md"
          >
            Reset game
          </button>
          <button
            onClick={rollDice}
            className="uppercase tracking-wide font-semibold bg-orange-600 text-white py-2 px-5 rounded-md hover:bg-orange-700"
          >
            {tenzies ? "Start New Game" : "roll"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
