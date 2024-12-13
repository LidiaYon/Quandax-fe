import { RoleTypes } from "../types/common.types";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}

export interface TokenPayload {
  userId: string;
  role: RoleTypes;
  exp: number;
  iat: number;
}

  export interface IForgotPasswordRequest {
    email: string;
  }
  
  export interface IResetPasswordRequest {
    token: string;
    newPassword: string;
  }
  
  export interface IForgotPasswordResponse {
    message: string;
  }