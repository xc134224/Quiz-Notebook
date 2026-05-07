import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AnswerResult from "../components/AnswerResult";
import OptionList from "../components/OptionList";
import QuestionCard from "../components/QuestionCard";
import { sampleQuestions } from "../data/sampleQuestions";
import { getQuestionByIndex, getRandomQuestion, getWrongQuestions } from "../services/quizService";
import { addAnswerRecord, addOrUpdateWrongQuestion, loadStudyState } from "../services/storageService";
import type { OptionKey, Question, QuizMode } from "../types/question";
import { isAnswerCorrect } from "../utils/answerUtils";
import { useStudyState } from "../hooks/useStudyState";

function createAnswerRecordId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `answer-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isQuizMode(value: string | undefined): value is QuizMode {
  return value === "random" || value === "sequential" || value === "wrong";
}

export default function QuizPage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const mode: QuizMode = isQuizMode(params.mode) ? params.mode : "random";
  const [studyState, setStudyState] = useStudyState(loadStudyState);
  const wrongQuestionIds = studyState.wrongQuestions.map((wrongQuestion) => wrongQuestion.questionId);
  const wrongQuestions = useMemo(
    () => getWrongQuestions(sampleQuestions, wrongQuestionIds),
    [wrongQuestionIds.join("|")]
  );
  const questionPool = mode === "wrong" ? wrongQuestions : sampleQuestions;
  const initialQuestionId = searchParams.get("questionId");
  const initialWrongQuestion = wrongQuestions.find((question) => question.id === initialQuestionId) ?? null;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(() => {
    if (mode === "random") {
      return getRandomQuestion(sampleQuestions);
    }

    if (mode === "wrong") {
      return initialWrongQuestion ?? getQuestionByIndex(wrongQuestions, 0);
    }

    return getQuestionByIndex(sampleQuestions, 0);
  });
  const [selectedOptions, setSelectedOptions] = useState<OptionKey[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  useEffect(() => {
    if (mode !== "wrong") {
      return;
    }

    setCurrentQuestion((previousQuestion) => {
      if (previousQuestion && wrongQuestions.some((question) => question.id === previousQuestion.id)) {
        return previousQuestion;
      }

      return initialWrongQuestion ?? getQuestionByIndex(wrongQuestions, 0);
    });
  }, [initialWrongQuestion, mode, wrongQuestions]);

  function resetAnswerState(nextQuestion: Question | null): void {
    setCurrentQuestion(nextQuestion);
    setSelectedOptions([]);
    setSubmitted(false);
    setAnswerCorrect(false);
  }

  function handleSubmitAnswer(): void {
    if (!currentQuestion || selectedOptions.length === 0 || submitted) {
      return;
    }

    const isCorrect = isAnswerCorrect(selectedOptions, currentQuestion.answer);
    const nextStateWithRecord = addAnswerRecord({
      id: createAnswerRecordId(),
      questionId: currentQuestion.id,
      userAnswer: selectedOptions,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      mode,
      answeredAt: new Date().toISOString()
    });
    const nextState = isCorrect ? nextStateWithRecord : addOrUpdateWrongQuestion(currentQuestion.id);

    setStudyState(nextState);
    setAnswerCorrect(isCorrect);
    setSubmitted(true);
  }

  function handleNextQuestion(): void {
    if (mode === "random") {
      resetAnswerState(getRandomQuestion(sampleQuestions));
      return;
    }

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    resetAnswerState(getQuestionByIndex(questionPool, nextIndex));
  }

  if (questionPool.length === 0 || !currentQuestion) {
    return (
      <section className="empty-state">
        <h1>{mode === "wrong" ? "暂无错题，继续保持！" : "题库为空"}</h1>
        <p>{mode === "wrong" ? "答错的题目会自动进入错题集。" : "请先添加题目后再开始练习。"}</p>
        <Link className="primary-button" to="/quiz/random">
          开始随机刷题
        </Link>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <div className="section-title">
        <div>
          <p className="eyebrow">
            {mode === "random" ? "随机刷题" : mode === "sequential" ? "顺序刷题" : "错题练习"}
          </p>
          <h1>选择答案后提交</h1>
        </div>
        <Link className="secondary-button" to="/">
          返回首页
        </Link>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={questionPool.findIndex((question) => question.id === currentQuestion.id) + 1}
        totalQuestions={questionPool.length}
      />
      <OptionList
        question={currentQuestion}
        selectedOptions={selectedOptions}
        submitted={submitted}
        onChange={setSelectedOptions}
      />

      <div className="action-row">
        <button
          className="primary-button"
          type="button"
          disabled={selectedOptions.length === 0 || submitted}
          onClick={handleSubmitAnswer}
        >
          提交答案
        </button>
        <button className="secondary-button" type="button" disabled={!submitted} onClick={handleNextQuestion}>
          下一题
        </button>
      </div>

      {submitted ? (
        <AnswerResult question={currentQuestion} userAnswer={selectedOptions} isCorrect={answerCorrect} />
      ) : null}
    </div>
  );
}
