import type { OptionKey, Question } from "../types/question";
import { formatAnswer } from "../utils/answerUtils";

interface AnswerResultProps {
  question: Question;
  userAnswer: OptionKey[];
  isCorrect: boolean;
}

export default function AnswerResult({ question, userAnswer, isCorrect }: AnswerResultProps) {
  return (
    <section className={`answer-result ${isCorrect ? "correct" : "wrong"}`}>
      <h2>{isCorrect ? "回答正确" : "回答错误"}</h2>
      <p>
        <strong>你的答案：</strong>
        {formatAnswer(userAnswer)}
      </p>
      <p>
        <strong>正确答案：</strong>
        {formatAnswer(question.answer)}
      </p>
      <p>
        <strong>解析：</strong>
        {question.explanation}
      </p>
    </section>
  );
}
