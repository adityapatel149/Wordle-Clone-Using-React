import { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const { onDelete, onEnter, onSelectLetter, keyboardStatus } = useContext(
    AppContext
  );

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="keyboard-row">
        {keys1.map((key) => (
          <Key keyVal={key} key={key} disabled={keyboardStatus.has(key)} />
        ))}
      </div>
      <div className="keyboard-row">
        {keys2.map((key) => (
          <Key keyVal={key} key={key} disabled={keyboardStatus.has(key)} />
        ))}
      </div>

      <div className="keyboard-row">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key keyVal={key} key={key} disabled={keyboardStatus.has(key)} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
