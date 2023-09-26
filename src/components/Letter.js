import { AppContext } from "../App";
import { useContext } from "react";
const Letter = ({ letterPos, attemptVal, statusArray }) => {
  let status = "empty";
  const { board } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  status =
    statusArray[letterPos] === 2
      ? "correct"
      : statusArray[letterPos] === 1
      ? "almost"
      : statusArray[letterPos] === 0
      ? "incorrect"
      : "empty";

  return <div className={`letter ${status}`}>{letter}</div>;
};

export default Letter;
