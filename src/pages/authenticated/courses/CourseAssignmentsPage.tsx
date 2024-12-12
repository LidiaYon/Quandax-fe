import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { userHasPower } from "../../../utils/userPowers";
import { useAppSelector } from "../../../store/hooks/hooks";
import AssignmentsList from "../components/AssignmentsList";



const CourseAssignmentsPage = () => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { courseId, courseName } = useParams(); 
 
    return (
        <MainLayout title={`${courseName} Assignements`}>
            <div className="space-y-4 pt-16">
                <ActionBar>
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                        Back to Courses List
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/courses/${courseId}`)}>
                        Back to Course Information
                    </Button>

                    <Button variant="outline" onClick={() => navigate(`/course/assignement/new/${courseId}/${courseName}`)}>
                        Create New Assignment
                    </Button>
                </ActionBar>
                {courseId && courseName && (
                    <AssignmentsList
                        caller="courses"
                        courseId={courseId}
                        courseName={courseName}
                        canDeleteAssignment={userHasPower("manageCourseAssignments", user?.role)}
                        handleViewAssignement={(assignementId)=>console.log(assignementId)}
                    />

                )}

            </div>
        </MainLayout>
    );
};

export default CourseAssignmentsPage;