import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { ICourse } from "@lidiayon/sharedlibs";
import { showToast } from "../../../components/common/Toaster";
import ServiceCourse from "../../../services/ServiceCourse";
import { BooleanDetailComponent, DateDetailComponent, LargeTextDetailComponent, RowDetailComponent } from "../components/RowDetailComponent";
import { userHasPower } from "../../../utils/userPowers";
import { useAppSelector } from "../../../store/hooks/hooks";
import ServiceEnrollment from "../../../services/ServiceEnrollment";



const CourseDetailsPage = () => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState<ICourse | null>(null);

    useEffect(() => {
        if (id) {
            ServiceCourse.getCourse(id)
                .then(data => setCourse(data))
                .catch(error => {
                    showToast({
                        message: 'Error loading course details',
                        type: 'error',
                        error
                    });
                    navigate('/courses');
                });
        }
    }, [id, navigate]);

    const handleCourseActivate = async (currentStatus: boolean) => {
        if (!course) return;
        try {
            await ServiceCourse.updateStatus(course._id, !currentStatus)
            setCourse({ ...course, isPublished: !currentStatus })
        } catch (error) {
            showToast({
                type: "error",
                message: "There was an error updating the user of the app",
                error
            })
        }

    }

    const enrollToCourse = async () => {
        if (!course) return;
        try {
            await ServiceEnrollment.enrollToCourse({
                courseId: course._id
            })
            showToast({
                type: "success",
                message: "You have been enrolled to the course successfully"
            })
        } catch (error) {
            showToast({
                type: "error",
                message: `There was an error enrolling to the course`,
                error: error
            }

            )
        }

    }

    if (!course) return <p>no course</p>
    return (
        <MainLayout title={`${course.title}`}>
            <div className="space-y-4 pt-16">
                <ActionBar>
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                        Back to Courses List
                    </Button>
                </ActionBar>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Course Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>



                            <RowDetailComponent label="Title" value={course.title} />

                            <RowDetailComponent label="Code" value={course.code} />
                            <RowDetailComponent label="Duration" value={course.duration?.toString()} />
                            <RowDetailComponent label="Enrollment Limit" value={course.enrollmentLimit?.toString()} />
                            <DateDetailComponent label="Start Date" value={course.startDate} />
                            <DateDetailComponent label="End Date" value={course.endDate} />
                            <BooleanDetailComponent label="Is Published?" value={course.isPublished} />
                            <LargeTextDetailComponent label="Description" value={course.description} />



                        </dl>
                    </div>

                </div>
                <ActionBar>
                    {userHasPower("updateCourseStatus", user?.role) && (
                        <Button variant="outline" onClick={() => handleCourseActivate(course.isPublished)}>
                            {course.isPublished ? "Unpublish" : "Publish"}
                        </Button>
                    )}

                    {userHasPower("manageCourseContent", user?.role) && (
                        <Button variant="outline" onClick={() => navigate(`/courses/content/${course._id}`)}>
                            Manage Course Content
                        </Button>
                    )}

                    {userHasPower("manageCourseEnrollments", user?.role) && (
                        <Button variant="outline" onClick={() => enrollToCourse()}>
                            Enroll to Course
                        </Button>
                    )}

                    {userHasPower("manageCourseContent", user?.role) && (
                        <Button variant="outline" onClick={() => navigate(`/course/assignements/${course._id}/${course.title}`)}>
                            Course Assignments
                        </Button>
                    )}



                </ActionBar>
            </div>
        </MainLayout>
    );
};

export default CourseDetailsPage;