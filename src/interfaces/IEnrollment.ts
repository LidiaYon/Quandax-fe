import { EnrollmentStatus } from "../types/common.types";

export interface IEnrollment {
    _id: string;
    user: string;
    course: string;
    status: EnrollmentStatus;
    enrolledAt: Date;
    completedAt?: Date;
    progress: number;
  }