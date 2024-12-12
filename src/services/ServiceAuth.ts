import { IForgotPasswordRequest, IForgotPasswordResponse, ILoginRequest, ILoginResponse, IUser } from '@lidiayon/sharedlibs';
import { EndPoints } from '../settings/EndPoints';
import {  deleteToken, isTokenValid } from '../utils/session.utils';
import ServiceApi from './ServiceApi';
import { IUserFormData } from '../interfaces/IUserFormData';



const ServiceAuth = {
  login: async (credentials: ILoginRequest) => {
    const response = await ServiceApi.post<ILoginResponse>(EndPoints.auth.login, credentials);
    return response.data;
  },

  forgotPassword: async (credentials: IForgotPasswordRequest) => {
    const response = await ServiceApi.post<IForgotPasswordResponse>(EndPoints.auth.forgotPassword, credentials);
    return response.data;
  },

  register: async (data: IUserFormData) => {
    const response = await ServiceApi.post<IUser>(EndPoints.auth.register, data);
    return response.data;
  },

  logout: () => {
    deleteToken()
  },

  isAuthenticated: (): boolean => {
    return !!isTokenValid();
  }
};

export default ServiceAuth;