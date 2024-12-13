import { QuestionType } from "../types/common.types";

export interface IChoiceQuestionOptions {
  value: string;
  label: string;
}

export interface IAssignmentQuestion {
  questionId: string;
  questionText: string;
  questionType: QuestionType;
  options?: IChoiceQuestionOptions[];
  correctAnswer?: string;
  points: number;
}

export interface IAssignmentSubmissionResult {
  inCorrectlyAnsweredQuestions: IAssignmentQuestion[];
  totalFlawedQuestions: number;
  finalScore: number;
  outOf: number;
}

export interface ISubmissionAnswer {
  questionId: string;
  userAnswer: string;
}

export interface IAssignmentSubmission {
  assignment: string;
  user: string;
  answers: ISubmissionAnswer[];
}


export interface IAssignment {
    _id: string; 
    course: string;
    title: string;
    description?: string;
    dueDate: Date;
    totalPoints: number;
    questions: IAssignmentQuestion[];
    createdAt: Date;
    updatedAt: Date;
  }
  