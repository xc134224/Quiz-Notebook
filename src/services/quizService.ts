import type { Question } from "../types/question";

export function getRandomQuestion(questions: Question[], excludeIds: string[] = []): Question | null {
  const availableQuestions = questions.filter((question) => !excludeIds.includes(question.id));
  const sourceQuestions = availableQuestions.length > 0 ? availableQuestions : questions;

  if (sourceQuestions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * sourceQuestions.length);
  return sourceQuestions[randomIndex] ?? null;
}

export function getQuestionByIndex(questions: Question[], index: number): Question | null {
  if (questions.length === 0) {
    return null;
  }

  const normalizedIndex = ((index % questions.length) + questions.length) % questions.length;
  return questions[normalizedIndex] ?? null;
}

export function getWrongQuestions(questions: Question[], wrongQuestionIds: string[]): Question[] {
  const wrongQuestionIdSet = new Set(wrongQuestionIds);
  return questions.filter((question) => wrongQuestionIdSet.has(question.id));
}
