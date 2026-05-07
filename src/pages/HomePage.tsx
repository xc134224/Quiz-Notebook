import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { sampleQuestions } from "../data/sampleQuestions";
import { getStudyStats } from "../services/statsService";
import { clearStudyState, loadStudyState } from "../services/storageService";
import { useStudyState } from "../hooks/useStudyState";

export default function HomePage() {
  const [studyState, setStudyState] = useStudyState(loadStudyState);
  const stats = getStudyStats(sampleQuestions, studyState);

  function handleClearStudyState(): void {
    const nextState = clearStudyState();
    setStudyState(nextState);
  }

  return (
    <div className="page-stack">
      <section className="hero-card">
        <p className="eyebrow">深度学习八股题库</p>
        <h1>Quiz Notebook</h1>
        <p>所有学习记录保存在当前浏览器 localStorage，不需要服务器和账号。</p>
        <div className="action-row">
          <Link className="primary-button" to="/quiz/random">
            开始随机刷题
          </Link>
          <Link className="secondary-button" to="/quiz/sequential">
            顺序刷题
          </Link>
          <Link className="secondary-button" to="/wrong-book">
            错题集
          </Link>
          <button className="danger-button" type="button" onClick={handleClearStudyState}>
            重置学习记录
          </button>
        </div>
      </section>

      <section className="stat-grid" aria-label="学习概况">
        <StatCard title="总题数" value={stats.totalQuestions} />
        <StatCard title="已答题数" value={stats.answeredCount} />
        <StatCard title="答对题数" value={stats.correctCount} />
        <StatCard title="答错题数" value={stats.wrongCount} />
        <StatCard title="正确率" value={`${stats.accuracy}%`} />
        <StatCard title="错题集数量" value={stats.wrongQuestionCount} />
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>分类答题情况</h2>
          <span>按答题次数统计</span>
        </div>
        {stats.categoryStats.length > 0 ? (
          <div className="category-list">
            {stats.categoryStats.map((categoryStat) => (
              <div className="category-row" key={categoryStat.category}>
                <strong>{categoryStat.category}</strong>
                <span>
                  {categoryStat.correct}/{categoryStat.total} 正确，正确率 {categoryStat.accuracy}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">还没有答题记录。</p>
        )}
      </section>
    </div>
  );
}
