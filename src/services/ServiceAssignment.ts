import { IAssignment, IAssignmentSubmission, IAssignmentSubmissionResult } from '../interfaces/IAssignment';
import { EndPoints } from '../settings/EndPoints';
import ServiceApi from './ServiceApi';



const ServiceAssignment = {

  createAssignment: async (data: IAssignment) => {
    const response = await ServiceApi.post<void>(EndPoints.courses.createNewAssignment, data)
    return response.data
  },

  courseAssignments: async (courseId: string, caller: string) => {
    const url = caller === "courses" ? `${EndPoints.courses.assignments}${courseId}` :    `${EndPoints.enrollments.viewCourseAssignments}${courseId}`
    const response = await ServiceApi.get<IAssignment[]>(
     url,
    );
  
  return response.data;
  },

  deleteCourseAssignment: async (courseId: string, assignmentId: string) => {
    const response = await ServiceApi.delete<boolean>(
        `${EndPoints.courses.deleteAssignment}${courseId}/${assignmentId}`,
      );
  
    return response.data;
  },


getCourseAssignment: async (courseId: string, assignmentId: string ) => {
  const response = await ServiceApi.get<IAssignment>(
      `${EndPoints.enrollments.viewCourseAssignment}${courseId}/${assignmentId}`,
    );

  return response.data;
},

submitAssignment: async (data: IAssignmentSubmission ) => {
  const response = await ServiceApi.post<IAssignmentSubmissionResult>(
      `${EndPoints.assignments.submit}`,
      data
    );

  return response.data;
},



};

export default ServiceAssignment;