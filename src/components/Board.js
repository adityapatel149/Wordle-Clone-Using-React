import Attempt from "./Attempt";

const Board = () => {
  return (
    <div className="board">
      <Attempt attemptVal={0} />
      <Attempt attemptVal={1} />
      <Attempt attemptVal={2} />
      <Attempt attemptVal={3} />
      <Attempt attemptVal={4} />
      <Attempt attemptVal={5} />
    </div>
  );
};

export default Board;
