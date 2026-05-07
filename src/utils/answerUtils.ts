import type { OptionKey } from "../types/question";

export function isAnswerCorrect(userAnswer: OptionKey[], correctAnswer: OptionKey[]): boolean {
  if (userAnswer.length !== correctAnswer.length) {
    return false;
  }

  const sortedUserAnswer = [...userAnswer].sort();
  const sortedCorrectAnswer = [...correctAnswer].sort();

  return sortedUserAnswer.every((item, index) => item === sortedCorrectAnswer[index]);
}

export function formatAnswer(answer: OptionKey[]): string {
  return [...answer].sort().join("、");
}
