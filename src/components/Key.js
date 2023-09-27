import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, correct, almost, incorrect }) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className={`keyboard-key ${bigKey && "big-key"} ${
        correct && "correctKey"
      } ${almost && "almostKey"} ${incorrect && "incorrectKey"}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
