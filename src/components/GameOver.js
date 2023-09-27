import { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, chosenWord, currentAttempt, resetGame } =
    useContext(AppContext);
  const playAgain = () => {
    resetGame();
  };
  return (
    <div className={`gameOver ${gameOver.won ? "gameWon" : "gameLost"}`}>
      {gameOver.won && (
        <h3 className="attemptMessage">
          You guessed it in {currentAttempt.attempt} attempts
        </h3>
      )}
      <h1 className="answerMessage">
        The word was : {chosenWord.toUpperCase()}
      </h1>

      <h3 className="gameOverMessage">
        {gameOver.won
          ? "Wordle Warrior, you're on fire! Can you guess the next word? "
          : "Don't lose heart! Wordle success is on the horizon!"}
      </h3>
      <button onClick={playAgain} className="primaryButton">
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
