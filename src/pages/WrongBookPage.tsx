import { Link } from "react-router-dom";
import { sampleQuestions } from "../data/sampleQuestions";
import { getWrongQuestions } from "../services/quizService";
import { loadStudyState, removeWrongQuestion } from "../services/storageService";
import { formatAnswer } from "../utils/answerUtils";
import { useStudyState } from "../hooks/useStudyState";

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "未知时间";
  }

  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function WrongBookPage() {
  const [studyState, setStudyState] = useStudyState(loadStudyState);
  const wrongQuestionIds = studyState.wrongQuestions.map((wrongQuestion) => wrongQuestion.questionId);
  const wrongQuestions = getWrongQuestions(sampleQuestions, wrongQuestionIds);

  function handleRemoveWrongQuestion(questionId: string): void {
    const nextState = removeWrongQuestion(questionId);
    setStudyState(nextState);
  }

  if (wrongQuestions.length === 0) {
    return (
      <section className="empty-state">
        <h1>暂无错题，继续保持！</h1>
        <p>答错的题目会自动记录在这里。</p>
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
          <p className="eyebrow">Wrong Book</p>
          <h1>错题集</h1>
        </div>
        <Link className="primary-button" to="/quiz/wrong">
          只练习错题
        </Link>
      </div>

      <div className="wrong-list">
        {wrongQuestions.map((question) => {
          const wrongQuestionState = studyState.wrongQuestions.find(
            (wrongQuestion) => wrongQuestion.questionId === question.id
          );

          return (
            <article className="wrong-card" key={question.id}>
              <div className="question-meta">
                <span>{question.type === "single" ? "单选" : "多选"}</span>
                <span>{question.category}</span>
                <span>错误 {wrongQuestionState?.wrongCount ?? 0} 次</span>
                <span>最近错误：{formatDateTime(wrongQuestionState?.lastWrongAt ?? "")}</span>
              </div>
              <h2>{question.question}</h2>
              <p>
                <strong>正确答案：</strong>
                {formatAnswer(question.answer)}
              </p>
              <p>
                <strong>解析：</strong>
                {question.explanation}
              </p>
              <div className="action-row">
                <Link className="secondary-button" to={`/quiz/wrong?questionId=${question.id}`}>
                  重新练习
                </Link>
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => handleRemoveWrongQuestion(question.id)}
                >
                  移出错题集
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
