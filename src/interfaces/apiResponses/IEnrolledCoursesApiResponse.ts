import { ICourse } from "../ICourse";
import { IMaterialCompletion } from "../IMaterialCompletion";

interface IFlattenedCourseResponse {
    _id: string;
    title: string;
    duration: number;
}

export interface IEnrolledCoursesApiResponse {
    _id: string;
    userId: string;
    course: IFlattenedCourseResponse;
    status: string;
    enrolledAt: Date;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEnrolledCourseContents {
    enrolledCourse: ICourse,
    completedStudyMaterials: IMaterialCompletion[]
}