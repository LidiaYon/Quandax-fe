import { EndPoints } from '../settings/EndPoints';
import ServiceApi from './ServiceApi';
import { IEnrollmentFormData, IUpdateEnrollmentProgressFormData } from '../interfaces/IEnrollmentFormData';
import { IEnrolledCourseContents, IEnrolledCoursesApiResponse } from '../interfaces/apiResponses/IEnrolledCoursesApiResponse';
import { IAssignment } from '../interfaces/IAssignment';
import { IEnrollment } from '../interfaces/IEnrollment';



const ServiceEnrollment = {

  getMyCourses: async () => {
    const response = await ServiceApi.get<IEnrolledCoursesApiResponse[]>(EndPoints.enrollments.myCourses)
    return response.data
  },

  enrollToCourse: async (data: IEnrollmentFormData) => {
    const response = await ServiceApi.post<void>(EndPoints.enrollments.enroll, data)
    return response.data
  },

  updateProgress: async (data: IUpdateEnrollmentProgressFormData) => {
    const response = await ServiceApi.put<boolean>(EndPoints.enrollments.updateProgress, data)
    return response.data
  },


dropCourse: async (courseId: string) => {
  const response = await ServiceApi.delete<boolean>(
      `${EndPoints.enrollments.dropCourse.concat(courseId)}`,
    );

  return response.data;
},

getCourseContent: async (courseId: string) => {
  const response = await ServiceApi.get<IEnrolledCourseContents>(
      `${EndPoints.enrollments.viewCourseContents}${courseId}`,
    );

  return response.data;
},

getCourseAssignments: async (courseId: string) => {
  const response = await ServiceApi.get<IAssignment[]>(
      `${EndPoints.enrollments.viewCourseAssignments}${courseId}`,
    );

  return response.data;
},

markStudyMaterialAsComplete: async (courseId: string, materialId: string ) => {
  const response = await ServiceApi.post<IEnrollment>(
      `${EndPoints.enrollments.markStudyMaterialAsComplete}`,
      {courseId, materialId}
    );

  return response.data;
},



};

export default ServiceEnrollment;