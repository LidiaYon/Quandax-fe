import { MaterialTypes } from "@lidiayon/sharedlibs";

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
};

export const getContentTypeLabel = (type: MaterialTypes) => {
    switch(type) {
        case MaterialTypes.VIDEO:
            return "Video";
        case MaterialTypes.PDF:
            return "PDF";
        default:
            return type;
    }
};
