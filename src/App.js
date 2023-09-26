import { createContext, useEffect, useState } from "react";
import "./styles.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateAnswerSet, generateWordSet } from "./Words";

export const AppContext = createContext();

export default function App() {
  const [chosenWord, setChosenWord] = useState("build");
  const [wordSet, setWordSet] = useState(new Set());
  const [incorrectKeys, setIncorrectKeys] = useState(new Set());
  const [almostKeys, setAlmostKeys] = useState(new Set());
  const [correctKeys, setCorrectKeys] = useState(new Set());

  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let guessedWord = [...board[currentAttempt.attempt]].join("");

    if (wordSet.has(guessedWord.toLowerCase())) {
      setCurrentAttempt({
        ...currentAttempt,
        attempt: currentAttempt.attempt + 1,
        letterPos: 0,
      });
    } else {
      alert("Word not Found");
    }

    if (guessedWord.toLowerCase() === chosenWord) {
      alert("YOU WON");
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          chosenWord,
          board,
          setBoard,
          incorrectKeys,
          setIncorrectKeys,
          almostKeys,
          setAlmostKeys,
          correctKeys,
          setCorrectKeys,
          currentAttempt,
          setCurrentAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
        }}
      >
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}
