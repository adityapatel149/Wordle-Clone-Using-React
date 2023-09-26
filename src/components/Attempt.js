import Letter from "./Letter";
import { AppContext } from "../App";
import { useContext, useEffect } from "react";
import WordCheck from "../WordCheck";

const Attempt = ({ attemptVal }) => {
  const {
    chosenWord,
    board,
    currentAttempt,
    incorrectKeys,
    setIncorrectKeys,
    almostKeys,
    setAlmostKeys,
    correctKeys,
    setCorrectKeys,
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
        if (statusArray[i] === 2) {
          setCorrectKeys((prev) => new Set([...prev, guessedWord[i]]));
        } else if (statusArray[i] === 1) {
          setAlmostKeys((prev) => new Set([...prev, guessedWord[i]]));
        } else {
          if (
            !correctKeys.has(guessedWord[i]) &&
            !almostKeys.has(guessedWord[i])
          ) {
            setIncorrectKeys((prev) => new Set([...prev, guessedWord[i]]));
          }
        }
      }
      console.log(correctKeys, almostKeys, incorrectKeys);
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
