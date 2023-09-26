import Letter from "./Letter";
import { AppContext } from "../App";
import { useContext, useEffect } from "react";
import WordCheck from "../WordCheck";

const Attempt = ({ attemptVal }) => {
  const {
    chosenWord,
    board,
    currentAttempt,
    keyboardStatus,
    setKeyboardStatus
  } = useContext(AppContext);

  let statusArray = [];

  if (currentAttempt.attempt > attemptVal) {
    const correctWord = chosenWord.toUpperCase().split("");
    let guessedWord = [...board[attemptVal]];
    statusArray = WordCheck(guessedWord, correctWord);
  }

  useEffect(() => {
    if (attemptVal === currentAttempt.attempt - 1) {
      let guessedWord = [...board[attemptVal]];
      console.log("New Attempt");
      for (let i = 0; i < 5; i++) {
        if (statusArray[i] === 0) {
          setKeyboardStatus((prev) => new Set([...prev, guessedWord[i]]));
        }
      }
      console.log(keyboardStatus);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="row">
      <Letter letterPos={0} attemptVal={attemptVal} statusArray={statusArray} />
      <Letter letterPos={1} attemptVal={attemptVal} statusArray={statusArray} />
      <Letter letterPos={2} attemptVal={attemptVal} statusArray={statusArray} />
      <Letter letterPos={3} attemptVal={attemptVal} statusArray={statusArray} />
      <Letter letterPos={4} attemptVal={attemptVal} statusArray={statusArray} />
    </div>
  );
};
export default Attempt;
