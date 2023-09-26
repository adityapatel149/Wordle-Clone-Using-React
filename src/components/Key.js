import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, disabled }) => {
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
        disabled && "disabledKey"
      }`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
