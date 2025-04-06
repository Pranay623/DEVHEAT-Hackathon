export interface QuestionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

export interface QuestionItem {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answeredCount: number;
  tags: string[];
  isBookmarked: boolean;
  isCompleted: boolean;
  timesAttempted?: number;
  lastAttempted?: string;
  avgTimeToSolve?: string;
  hasHints?: boolean;
  sampleAnswer?: string;
}
