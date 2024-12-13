import { RoleTypes } from "../types/common.types";

export interface IUser {
    _id: string; 
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: RoleTypes ;
    avatar?: string;
    phoneNumber?: string;
    active: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
  }
  