import { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, chosenWord, currentAttempt } = useContext(AppContext);
  return (
    <div className={`gameOver ${gameOver.won ? "gameWon" : "gameLost"}`}>
      <h3 className="gameOverMessage">
        {gameOver.won
          ? "Wordle Warrior, you're on fire! Can you guess the next word? "
          : "Don't lose heart! Wordle success is on the horizon!"}
      </h3>
      <h1 className="answerMessage">
        The word was : {chosenWord.toUpperCase()}
      </h1>
      {gameOver.won && (
        <h3 className="attemptMessage">
          You guessed it in {currentAttempt.attempt} attempts
        </h3>
      )}
    </div>
  );
};

export default GameOver;
