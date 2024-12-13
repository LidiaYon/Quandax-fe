import { ICourseContent } from "./ICourseContent";


export interface ICourse {
    _id: string; 
    title: string;
    code: string;
    description?: string;
    tutorId: string;
    thumbnail?: string;
    duration?: number;
    startDate?: Date;
    endDate?: Date;
    enrollmentLimit?: number;
    isPublished: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    content: ICourseContent[]
  }