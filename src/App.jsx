import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

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
   if(!tenzies){
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewRandomDice();
      })
    );
   }else{
    setTenzies(false)
    setDice(allNewDice())
   }
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
    }
  }, [dice]);

  return (
    <section className="app--section w-full h-[100vh] sm:p-2 p-4 md:p-10 text-center bg-white m-auto flex justify-center items-center">
      {tenzies && <Confetti />}
      <div className="app--container md:w-2/3 sm:w-full w-full bg-zinc-100 h-full rounded-lg items-center justify-center flex flex-col">
        <h1 className="text-[1.5rem] text-green-500 capitalize italic">{}</h1>
        <h1 className="text-[2.5rem]">Tenzies Game!</h1>
        <p>"Roll the Dice, Match the Numbers, and Race to Victory!"</p>
        <div className="app-dice--container grid grid-cols-5 gap-3 md:gap-6 lg:gap-6 my-8">
          {diceElements}
        </div>
        <button
          onClick={rollDice}
          className="uppercase tracking-wide font-semibold bg-orange-600 text-white py-2 px-5 rounded-md hover:bg-orange-700"
        >
          {tenzies ? "Start New Game" : "roll"}
        </button>
      </div>
    </section>
  );
}

export default App;
