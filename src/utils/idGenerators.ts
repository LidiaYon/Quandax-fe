import { v4 as uuidv4 } from 'uuid';

export const generateQuestionId = (): string => {
    return uuidv4()
}