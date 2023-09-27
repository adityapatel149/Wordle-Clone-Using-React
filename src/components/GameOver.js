import { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, chosenWord, currentAttempt } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.won
          ? "Congratulations Wordle Hero! Let's see if you can guess the next word."
          : "Don't lose heart! Wordle success is on the horizon!"}
      </h3>
      <h1>The word was : {chosenWord.toUpperCase()}</h1>
      {gameOver.won && (
        <h3>You guessed it in {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default GameOver;
