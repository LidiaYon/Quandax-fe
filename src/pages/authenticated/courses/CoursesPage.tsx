import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { showToast } from "../../../components/common/Toaster";
import { userHasPower } from "../../../utils/userPowers";
import { useAppSelector } from "../../../store/hooks/hooks";
import ServiceCourse from "../../../services/ServiceCourse";
import { ICourse } from "../../../interfaces/ICourse";

const styles = {
  th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase",
  td: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
}


const CoursesPage = () => {
  const user = useAppSelector((state) => state.user.user);

    const navigate = useNavigate();
    const [courses, setCourses] = useState<ICourse[]>([]);
  
    useEffect(() => {
      ServiceCourse.getAllCourses()
        .then(data => setCourses(data))
        .catch(error => {
            setCourses([]);
          showToast({
            message: 'Sorry there was an error getting you list of courses',
            type: 'error',
            error
          });
        });
    }, []);
  
    return (
      <MainLayout title="Courses">
        <div className="space-y-4 pt-16">
        <ActionBar>
          {userHasPower("createNewCourse", user?.role) && (
            <Button variant="primary" onClick={() => navigate("/courses/add")}>
              Add New Course
            </Button>
          )}
            
          </ActionBar>
  

          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={styles.th}>Title</th>
                  <th scope="col" className={styles.th}>Code</th>
                  <th scope="col" className={styles.th}>Is Published?</th>
                  <th scope="col" className={styles.th}>Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => navigate(`/courses/${course._id}`)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {course.title}
                    </button>

                    </td>
                    <td className={styles.td}>{course.code}</td>
                    <td className={styles.td}>
                      <span className={`px-2 py-1 inline-flex text-xs rounded-full ${course.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {course.isPublished ? 'Yes' : 'No'}
                      </span>
                    </td>                   
                    <td className={styles.td}>{course.duration}</td>

      
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-500">No courses found</div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  };
export default CoursesPage;