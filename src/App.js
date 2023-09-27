import { createContext, useEffect, useState, useReducer } from "react";
import "./styles.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateAnswerSet, generateWordSet } from "./Words";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CORRECTKEYS":
      if (state.almostKeys.has(action.payload)) {
        state.almostKeys.delete(action.payload);
      }
      return {
        ...state,
        correctKeys: new Set([...state.correctKeys, action.payload]),
        //almostKeys: state.almostKeys,
      };
    case "SET_ALMOSTKEYS":
      if (!state.correctKeys.has(action.payload)) {
        return {
          ...state,
          almostKeys: new Set([...state.almostKeys, action.payload]),
        };
      }
    case "SET_INCORRECTKEYS":
      if (
        !state.correctKeys.has(action.payload) &&
        !state.almostKeys.has(action.payload)
      ) {
        return {
          ...state,
          incorrectKeys: new Set([...state.incorrectKeys, action.payload]),
        };
      }
    default:
      return state;
  }
};

export default function App() {
  const [chosenWord, setChosenWord] = useState("build");
  const [wordSet, setWordSet] = useState(new Set());
  const [keyboardStatus, dispatch] = useReducer(reducer, {
    correctKeys: new Set(),
    almostKeys: new Set(),
    incorrectKeys: new Set(),
  });
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
          keyboardStatus,
          dispatch,
          setBoard,
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
