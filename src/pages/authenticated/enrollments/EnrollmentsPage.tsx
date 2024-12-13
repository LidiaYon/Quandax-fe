import { useNavigate } from "react-router-dom";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { showToast } from "../../../components/common/Toaster";
import ServiceEnrollment from "../../../services/ServiceEnrollment";
import { IEnrolledCoursesApiResponse } from "../../../interfaces/apiResponses/IEnrolledCoursesApiResponse";
import { EnrollmentStatus } from "../../../types/common.types";

const styles = {
  th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
  td: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
}


const EnrollmentsPage = () => {

  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<IEnrolledCoursesApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleDropCourse = async (courseId: string, index: number) => {
    try {

      if (confirm("Are you sure you want to drop the course?")) {
        setIsLoading(true)
        await ServiceEnrollment.dropCourse(courseId)
        const updatedEnrollments = [...enrollments]
        updatedEnrollments[index].status = EnrollmentStatus.DROPPED
        setEnrollments(updatedEnrollments)
        setIsLoading(false)
      }

    } catch (error) {
      setIsLoading(false)
      showToast({
        type: "error",
        message: "Error dropping the course",
        error
      })

    }
  }

  useEffect(() => {
    setIsLoading(true)
    ServiceEnrollment.getMyCourses()
      .then(data => {
        setEnrollments(data)
        setIsLoading(false)
      }
      )
      .catch(error => {
        setIsLoading(false)
        setEnrollments([]);
        showToast({
          message: 'Sorry there was an error getting you list of your enrolled courses',
          type: 'error',
          error
        });
      });
  }, []);

  return (
    <MainLayout title="My Enrolled Courses">
      <div className={`space-y-4 pt-16 ${isLoading ? "disabled-block" : ""}`}>

        <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className={styles.th}>Title</th>
                <th scope="col" className={styles.th}>Duration</th>
                <th scope="col" className={styles.th}>Progress</th>
                <th scope="col" className={styles.th}>Status</th>
                <th scope="col" className={styles.th}>&nbsp;</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment, index) => (
                <tr key={enrollment._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => navigate(`/courses/${enrollment.course._id}`)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {enrollment.course.title}
                    </button>

                  </td>
                  <td>{enrollment.course.duration}</td>

                  <td>{enrollment.progress}</td>
                  <td>{enrollment.status}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {enrollment.status === EnrollmentStatus.ACTIVE && (
                      <button className="text-red-600 hover:text-red-900 mr-4" onClick={() => handleDropCourse(enrollment.course._id, index)}>
                        Drop Course
                      </button>

                    )}

                    <button className="text-blue-600 hover:text-red-900 mr-4" onClick={() => navigate(`/enrollments/view-content/${enrollment.course._id}/${enrollment.course.title}`)}>
                      View Course
                    </button>

                    <button className="text-purple-600 hover:text-red-900" onClick={() => navigate(`/enrollments/view-assignments/${enrollment.course._id}/${enrollment.course.title}`)}>
                      Assignments
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          {enrollments.length === 0 && (
            <div className="text-center py-8 text-gray-500">No enrollments found</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default EnrollmentsPage;