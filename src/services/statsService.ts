import type { CategoryStat, Question, StudyState, StudyStats } from "../types/question";

export function getStudyStats(questions: Question[], state: StudyState): StudyStats {
  const answeredCount = state.answerRecords.length;
  const correctCount = state.answerRecords.filter((record) => record.isCorrect).length;
  const wrongCount = answeredCount - correctCount;
  const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
  const questionCategoryMap = new Map(questions.map((question) => [question.id, question.category]));
  const categoryStatMap = new Map<string, CategoryStat>();

  for (const question of questions) {
    if (!categoryStatMap.has(question.category)) {
      categoryStatMap.set(question.category, {
        category: question.category,
        total: 0,
        correct: 0,
        wrong: 0,
        accuracy: 0
      });
    }
  }

  for (const record of state.answerRecords) {
    const category = questionCategoryMap.get(record.questionId);

    if (!category) {
      continue;
    }

    const categoryStat = categoryStatMap.get(category);

    if (!categoryStat) {
      continue;
    }

    categoryStat.total += 1;

    if (record.isCorrect) {
      categoryStat.correct += 1;
    } else {
      categoryStat.wrong += 1;
    }

    categoryStat.accuracy =
      categoryStat.total === 0 ? 0 : Math.round((categoryStat.correct / categoryStat.total) * 100);
  }

  return {
    totalQuestions: questions.length,
    answeredCount,
    correctCount,
    wrongCount,
    accuracy,
    wrongQuestionCount: state.wrongQuestions.length,
    categoryStats: Array.from(categoryStatMap.values()).filter((stat) => stat.total > 0)
  };
}
