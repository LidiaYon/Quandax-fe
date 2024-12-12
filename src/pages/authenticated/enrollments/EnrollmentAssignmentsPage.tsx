import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import AssignmentsList from "../components/AssignmentsList";



const EnrollmentAssignmentsPage = () => {
    const navigate = useNavigate();
    const { courseId, courseName } = useParams();

    const handleViewAssignement = (assignmentId: string)=>{
        navigate(`/enrollments/load-assignment/${courseId}/${courseName}/${assignmentId}`)
    }

    return (
        <MainLayout title={`${courseName} Assignements`}>
            <div className="space-y-4 pt-16">
                <ActionBar>
                    <Button variant="outline" onClick={() => navigate(`/enrollments`)}>
                        Back to My Courses
                    </Button>

                   
                </ActionBar>
                {courseId && courseName && (
                    <AssignmentsList
                    handleViewAssignement={handleViewAssignement}
                        caller="enrollments"
                        courseId={courseId}
                        courseName={courseName}
                        canDeleteAssignment={false}
                    />

                )}

            </div>
        </MainLayout>
    );
};

export default EnrollmentAssignmentsPage;