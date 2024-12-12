import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useEffect, useState } from "react";
import { IAssignment } from "@lidiayon/sharedlibs";
import { showToast } from "../../../components/common/Toaster";
import { formatDate } from "../../../utils/common.utils";
import ServiceAssignment from "../../../services/ServiceAssignment";

interface IProps {
    caller: "courses" | "enrollments",
    courseId: string;
    courseName: string;
    canDeleteAssignment: boolean;
    handleViewAssignement: (assignmentId: string) => void;
}


const AssignmentsList: React.FC<IProps> = ({ caller, handleViewAssignement, courseId, courseName, canDeleteAssignment}) => {
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState<IAssignment[]>([]);

    const handleDeleteAssignment = async (assignmentId: string) => {
        if (confirm("Are you sure you want to delete the assignment. It is permanent.")) {
            try {
                await ServiceAssignment.deleteCourseAssignment(courseId!, assignmentId)

                setAssignments(assignments.filter(assignment => assignment._id !== assignmentId))
                showToast({
                    type: "success",
                    message: "Assignment deleted"
                })

            } catch (error) {
                showToast({
                    type: "error",
                    message: "Erorr handling delete assignment",
                    error
                })
            }
        }


    }

    useEffect(() => {
        if (courseId) {
            ServiceAssignment.courseAssignments(courseId, caller)
                .then(data => setAssignments(data))
                .catch(error => {
                    showToast({
                        message: 'Error loading course assignments',
                        type: 'error',
                        error
                    });
                });
        }
    }, [courseId, navigate]);

    return (

            <div className="space-y-4 pt-16">
               
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{courseName}</h3>
                    </div>

                    <div className="px-4 py-5 sm:p-6">

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Points
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total # Questions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assignments.map((content: IAssignment) => (
                                    <tr key={content._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {content.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {content.totalPoints}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {content.questions.length}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(content.dueDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Button variant="outline" onClick={()=>handleViewAssignement(content._id)}>
                                                    View
                                                </Button>
                                             

                                                {canDeleteAssignment && (
                                                    <Button variant="danger" onClick={() => handleDeleteAssignment(content._id)}>
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
   
    );
};

export default AssignmentsList;