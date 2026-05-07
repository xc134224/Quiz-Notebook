import type { Question } from "../types/question";

const difficultyLabels: Record<Question["difficulty"], string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难"
};

interface QuestionCardProps {
  question: Question;
  questionNumber?: number;
  totalQuestions?: number;
}

export default function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const questionTypeLabel = question.type === "single" ? "单选" : "多选";

  return (
    <section className="question-card">
      <div className="question-meta">
        {questionNumber && totalQuestions ? (
          <span>
            第 {questionNumber} / {totalQuestions} 题
          </span>
        ) : null}
        <span>{questionTypeLabel}</span>
        <span>{question.category}</span>
        <span>{difficultyLabels[question.difficulty]}</span>
      </div>
      <h1>{question.question}</h1>
      <div className="tag-list">
        {question.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </section>
  );
}
