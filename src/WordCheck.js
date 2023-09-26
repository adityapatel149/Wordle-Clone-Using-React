const WordCheck = (guessedWord, correctWord) => {
  //0:incorrect, 1:almost, 2:correct
  let statusArray = [0, 0, 0, 0, 0];

  for (let i = 0; i < 5; i++) {
    if (guessedWord[i] === correctWord[i]) {
      statusArray[i] = 2;
      guessedWord[i] = "";
      correctWord[i] = "";
    }
  }
  for (let i = 0; i < 5; i++) {
    if (guessedWord[i]) {
      if (correctWord.includes(guessedWord[i])) {
        statusArray[i] = 1;

        const index = correctWord.indexOf(guessedWord[i]);
        if (index > -1) {
          // only splice array when item is found
          correctWord.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  }
  return statusArray;
};

export default WordCheck;
