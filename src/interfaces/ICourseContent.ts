import { MaterialTypes } from "../types/common.types";

export interface ICourseContent {
    _id: string;
    title: string;
    description?: string;
    type: MaterialTypes;
    url: string;
    durationInMinutes?: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }