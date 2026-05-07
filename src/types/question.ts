export type QuestionType = "single" | "multiple";

export type OptionKey = "A" | "B" | "C" | "D" | "E" | "F";

export type Difficulty = "easy" | "medium" | "hard";

export type QuizMode = "random" | "sequential" | "wrong";

export interface Question {
  id: string;
  type: QuestionType;
  category: string;
  tags: string[];
  difficulty: Difficulty;
  question: string;
  options: Partial<Record<OptionKey, string>>;
  answer: OptionKey[];
  explanation: string;
}

export interface AnswerRecord {
  id: string;
  questionId: string;
  userAnswer: OptionKey[];
  correctAnswer: OptionKey[];
  isCorrect: boolean;
  mode: QuizMode;
  answeredAt: string;
}

export interface WrongQuestionState {
  questionId: string;
  wrongCount: number;
  lastWrongAt: string;
}

export interface StudyState {
  answerRecords: AnswerRecord[];
  wrongQuestions: WrongQuestionState[];
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

export interface StudyStats {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  wrongQuestionCount: number;
  categoryStats: CategoryStat[];
}
