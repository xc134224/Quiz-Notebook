import { useState } from "react";
import type { StudyState } from "../types/question";

export function useStudyState(initialState: () => StudyState) {
  return useState<StudyState>(initialState);
}
