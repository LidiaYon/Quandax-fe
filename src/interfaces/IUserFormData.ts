import { RoleTypes } from "../types/common.types";

export interface IUserFormData {
    email: string;
    firstName: string;
    lastName: string;
    role: RoleTypes;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }

  export interface IUserStatusFormData {
    userId: string;
    newStatus: boolean;
  }