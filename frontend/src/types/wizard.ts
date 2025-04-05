export interface WizardQuestion {
  id: string;
  question: string;
  type: "text" | "number" | "select";
  options?: string[];
}


  export interface WizardAnswers {
    [questionId: string]: string;
  }
  