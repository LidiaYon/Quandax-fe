// src/routes/index.tsx
import { RouteObject } from 'react-router-dom';
import { LoginPage, ForgotPasswordPage } from '../pages/guest';
import StartPage from '../pages/StartPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import AdminDashboardPage from '../pages/authenticated/AdminDashboardPage';
import UsersPage from '../pages/authenticated/user/UsersPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import CreateUserPage from '../pages/authenticated/user/CreateUserPage';
import UserDetailsPage from '../pages/authenticated/user/UserDetailsPage';
import CoursesPage from '../pages/authenticated/courses/CoursesPage';
import CreateCoursePage from '../pages/authenticated/courses/CreateCoursePage';
import CourseDetailsPage from '../pages/authenticated/courses/CourseDetailsPage';
import CourseContentPage from '../pages/authenticated/courses/CourseContentPage';
import EnrollmentsPage from '../pages/authenticated/enrollments/EnrollmentsPage';
import RegisterPage from '../pages/guest/RegisterPage';
import TutorDashboardPage from '../pages/authenticated/TutorDashboardPage';
import StudentDashboardPage from '../pages/authenticated/StudentDashboardPage';
import CourseAssignmentCreatorPage from '../pages/authenticated/courses/CourseAssignmentCreatorPage';
import CourseAssignmentsPage from '../pages/authenticated/courses/CourseAssignmentsPage';
import ViewCourseContentPage from '../pages/authenticated/enrollments/ViewCourseContentPage';
import EnrollmentAssignmentsPage from '../pages/authenticated/enrollments/EnrollmentAssignmentsPage';
import AssignmentPage from '../pages/authenticated/enrollments/AssignmentPage';


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/tutor',
    element: (
      <ProtectedRoute>
        <TutorDashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute>
        <StudentDashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    )
  },
  
    {
      path: '/users/add',
      element: (
        <ProtectedRoute>
          <CreateUserPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/users/:id',
      element: (
        <ProtectedRoute>
          <UserDetailsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/courses',
      element: (
        <ProtectedRoute>
          <CoursesPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/courses/add',
      element: (
        <ProtectedRoute>
          <CreateCoursePage />
        </ProtectedRoute>
      )
    },
    {
      path: '/courses/:id',
      element: (
        <ProtectedRoute>
          <CourseDetailsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/courses/content/:id',
      element: (
        <ProtectedRoute>
          <CourseContentPage />
        </ProtectedRoute>
      )
    }, 
    {
      path: '/course/assignement/new/:courseId/:courseName',
      element: (
        <ProtectedRoute>
          <CourseAssignmentCreatorPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/course/assignements/:courseId/:courseName',
      element: (
        <ProtectedRoute>
          <CourseAssignmentsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/enrollments',
      element: (
        <ProtectedRoute>
          <EnrollmentsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/enrollments/view-content/:courseId/:courseName/',
      element: (
        <ProtectedRoute>
          <ViewCourseContentPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/enrollments/view-assignments/:courseId/:courseName/',
      element: (
        <ProtectedRoute>
          <EnrollmentAssignmentsPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/enrollments/load-assignment/:courseId/:courseName/:assignmentId/',
      element: (
        <ProtectedRoute>
          <AssignmentPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/contact',
      element: <ContactPage />
    },
  
];

