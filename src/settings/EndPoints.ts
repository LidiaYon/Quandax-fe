let baseURL = import.meta.env.VITE_BACK_END_BASE_URL
let serverURL = import.meta.env.VITE_BACK_END_BASE_HOST

if (!baseURL?.endsWith("/")) {
    baseURL = baseURL + "/"
}
if (!serverURL?.endsWith("/")) {
    serverURL = serverURL + "/"
}

export const EndPoints = {
    baseURL,
    serverURL,
    "auth": {
        "login": `${baseURL}auth/login`,
        "register": `${baseURL}auth/register`,
        "forgotPassword": `${baseURL}auth/forgot-password`,
    },
    "users": {
        "getUsers": `${baseURL}users`,
        "getUser": `${baseURL}users/`,
        "getUserByRole": `${baseURL}users/role/`,
        "createNew":  `${baseURL}users`,
        "updateStatus": `${baseURL}users/user/update-status`,
    },
    "courses": {
        "getCoursesList": `${baseURL}courses`,
        "getCourse": `${baseURL}courses/`,
        "updateCourseStatus": `${baseURL}courses/update-status/`,
        "addContent": `${baseURL}courses/add-content/`,
        "deleteContent": `${baseURL}courses/delete-content/`,
        "createNew":  `${baseURL}courses`,
        "createNewAssignment": `${baseURL}courses/assignments/new`,
        "assignments": `${baseURL}courses/assignments/`,
        "deleteAssignment": `${baseURL}courses/assignments/`,
    },
    "enrollments": {
        "myCourses": `${baseURL}enrollments`,
        "enroll": `${baseURL}enrollments`,
        "dropCourse": `${baseURL}enrollments/drop/`,
        "updateProgress": `${baseURL}enrollments/update-progress`,
        "viewCourseContents": `${baseURL}enrollments/view-course-content/`,
        "viewCourseAssignments": `${baseURL}enrollments/view-course-assignments/`,
        "viewCourseAssignment": `${baseURL}enrollments/view-course-assignment/`,
        "markStudyMaterialAsComplete": `${baseURL}enrollments/complete-study-material/`,
    },
    "media": {
        "loadMedia": `${baseURL}`,
    },
    "assignments": {
        "submit": `${baseURL}assignments/submit/`,
    }
}