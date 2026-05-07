import type { AnswerRecord, StudyState } from "../types/question";

const STORAGE_KEY = "local-quiz-study-state";

const DEFAULT_STUDY_STATE: StudyState = {
  answerRecords: [],
  wrongQuestions: []
};

function isStudyState(value: unknown): value is StudyState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Partial<StudyState>;
  return Array.isArray(state.answerRecords) && Array.isArray(state.wrongQuestions);
}

export function loadStudyState(): StudyState {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return DEFAULT_STUDY_STATE;
    }

    const parsedState: unknown = JSON.parse(rawState);
    return isStudyState(parsedState) ? parsedState : DEFAULT_STUDY_STATE;
  } catch {
    return DEFAULT_STUDY_STATE;
  }
}

export function saveStudyState(state: StudyState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addAnswerRecord(record: AnswerRecord): StudyState {
  const currentState = loadStudyState();
  const nextState: StudyState = {
    ...currentState,
    answerRecords: [...currentState.answerRecords, record]
  };

  saveStudyState(nextState);
  return nextState;
}

export function addOrUpdateWrongQuestion(questionId: string): StudyState {
  const currentState = loadStudyState();
  const now = new Date().toISOString();
  const existingWrongQuestion = currentState.wrongQuestions.find(
    (wrongQuestion) => wrongQuestion.questionId === questionId
  );

  const wrongQuestions = existingWrongQuestion
    ? currentState.wrongQuestions.map((wrongQuestion) =>
        wrongQuestion.questionId === questionId
          ? {
              ...wrongQuestion,
              wrongCount: wrongQuestion.wrongCount + 1,
              lastWrongAt: now
            }
          : wrongQuestion
      )
    : [
        ...currentState.wrongQuestions,
        {
          questionId,
          wrongCount: 1,
          lastWrongAt: now
        }
      ];

  const nextState: StudyState = {
    ...currentState,
    wrongQuestions
  };

  saveStudyState(nextState);
  return nextState;
}

export function removeWrongQuestion(questionId: string): StudyState {
  const currentState = loadStudyState();
  const nextState: StudyState = {
    ...currentState,
    wrongQuestions: currentState.wrongQuestions.filter(
      (wrongQuestion) => wrongQuestion.questionId !== questionId
    )
  };

  saveStudyState(nextState);
  return nextState;
}

export function clearStudyState(): StudyState {
  saveStudyState(DEFAULT_STUDY_STATE);
  return DEFAULT_STUDY_STATE;
}
