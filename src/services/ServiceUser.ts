import { EndPoints } from '../settings/EndPoints';
import ServiceApi from './ServiceApi';
import { IUserFormData, IUserStatusFormData } from '../interfaces/IUserFormData';
import { ILoginResponse } from '../interfaces/IAuth';
import { IUser } from '../interfaces/IUser';



const ServiceUser = {
  register: async (data: IUserFormData) => {
    const response = await ServiceApi.post<ILoginResponse>(EndPoints.users.createNew, data);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await ServiceApi.get<IUser[]>(EndPoints.users.getUsers)
    return response.data
  },

  setUserStatus: async (data: IUserStatusFormData) => {
    const response = await ServiceApi.put<boolean>(EndPoints.users.updateStatus, data)
    return response.data
  },

  getUser: async (userId: string) => {
    const response = await ServiceApi.get<IUser>(EndPoints.users.getUser.concat(userId))
    return response.data
  },

  getUsersByRole: async (role: string) => {
    const response = await ServiceApi.get<IUser[]>(EndPoints.users.getUserByRole.concat(role))
    return response.data
  }

};

export default ServiceUser;