import answerBank from "./wordle-answer-list.txt";
import wordBank from "./accepted-word-list.txt";

export let boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
export const resetBoard = () => {
  boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
};

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

export const generateAnswer = async () => {
  let answer = "";
  await fetch(answerBank)
    .then((response) => response.text())
    .then((result) => {
      const answerArray = result.split("\n");
      answer = answerArray[Math.floor(Math.random() * answerArray.length)];
    });
  return { answer };
};
