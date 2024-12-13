import { EndPoints } from '../settings/EndPoints';
import ServiceApi from './ServiceApi';
import { ICourseFormData } from '../interfaces/ICourseFormData';
import { ICourse } from '../interfaces/ICourse';
import { ICourseContent } from '../interfaces/ICourseContent';



const ServiceCourse = {
  register: async (data: ICourseFormData) => {
    
    const response = await ServiceApi.post<ICourse>(EndPoints.courses.createNew, data);
    return response.data;
  },

  getAllCourses: async () => {
    const response = await ServiceApi.get<ICourse[]>(EndPoints.courses.getCoursesList)
    return response.data
  },

  getCourse: async (courseId: string) => {
    const response = await ServiceApi.get<ICourse>(EndPoints.courses.getCourse.concat(courseId))
    return response.data
  },

  updateStatus: async (courseId: string, newStatus: boolean) => {
    const response = await ServiceApi.put<boolean>(EndPoints.courses.updateCourseStatus.concat(courseId), {newStatus: newStatus})
    return response.data
  },

  addCourseContent: async (courseId: string, formData: FormData) => {
    const response = await ServiceApi.uploader<ICourseContent>(
        EndPoints.courses.addContent.concat(courseId), 
        formData
      );

    return response.data;
},

deleteCourseContent: async (courseId: string, contentId: string) => {
  const response = await ServiceApi.delete<boolean>(
      `${EndPoints.courses.deleteContent}${courseId}/${contentId}`,
    );

  return response.data;
},



};

export default ServiceCourse;