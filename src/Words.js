import answerBank from "./wordle-answer-list.txt";
import wordBank from "./accepted-word-list.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
];

export const generateWordSet = async () => {
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\n");
      wordSet = new Set(wordArray);
    });
  return { wordSet };
};

export const generateAnswerSet = async () => {
  let answerSet;
  await fetch(answerBank)
    .then((response) => response.text())
    .then((result) => {
      const answerArray = result.split("\n");
      answerSet = new Set(answerArray);
    });
  return { answerSet };
};
