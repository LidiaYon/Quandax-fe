import { RoleTypes } from "../types/common.types";

/*
what can users do
*/
const userActions = {
    createUser: "createUser",
    viewUsers: "viewUsers",
    setUserStatus: "setUserStatus",
    viewCourses: "viewCourses",
    createNewCourse: "createNewCourse",
    updateCourseStatus: "updateCourseStatus",
    manageCourseContent: "manageCourseContent",
    manageCourseEnrollments: "manageCourseEnrollments",
     manageCourseAssignments: "manageCourseAssignments"
} as const;

type UserActionKeys = keyof typeof userActions;

type IUserPower = {
    [action in UserActionKeys]: RoleTypes[];
};

const userPowers: IUserPower = {
    "viewUsers": ["ADMIN"],
    "setUserStatus": ["ADMIN"],
    "createUser": ["ADMIN"],
    "createNewCourse": ["TUTOR"],
    "viewCourses": ["ADMIN", "TUTOR", "STUDENT"],
    "updateCourseStatus": ["ADMIN", "TUTOR"],
    "manageCourseContent": ["TUTOR"],
    "manageCourseEnrollments": ["STUDENT"],
    "manageCourseAssignments": ["TUTOR"]
}

export function userHasPower(action: UserActionKeys, role: RoleTypes | undefined): boolean {

    if (role && userPowers[action] && userPowers[action].includes(role)) {
        return true
    }
    return false;
}