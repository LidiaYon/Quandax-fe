import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { ICourse, ICourseContent, IMaterialCompletion } from "@lidiayon/sharedlibs";
import { showToast } from "../../../components/common/Toaster";
import ServiceEnrollment from "../../../services/ServiceEnrollment";
import { formatDate, getContentTypeLabel } from "../../../utils/common.utils";
import Modal from "../../../components/common/Modal";
import MediaViewer from "../components/MediaViewer";
import Button from "../../../components/common/Button";
import FullScreenLoader from "../../../components/common/FullScreenLoader";


const ViewCourseContentPage = () => {

    const { courseId, courseName } = useParams();
    const [course, setCourse] = useState<ICourse | undefined>(undefined);
    const [completedContents, setCompletedContents] = useState<IMaterialCompletion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isViewingContent, setContentViewerIsOpen] = useState(false)
    const [viewCourseMedia, setViewCourseMedia] = useState<ICourseContent | undefined>(undefined)


    useEffect(() => {
        if (courseId) {
            setIsLoading(true)
            ServiceEnrollment.getCourseContent(courseId)
                .then(data => {
    
                    setCourse(data.enrolledCourse)
                    setCompletedContents(data.completedStudyMaterials)
                    setIsLoading(false)
                }
                )
                .catch(error => {
                    setIsLoading(false)
                    setCourse(undefined);
                    setCompletedContents([])
                    showToast({
                        message: 'Sorry there was an error getting the content',
                        type: 'error',
                        error
                    });
                });
        }

    }, [courseId]);

    if (!course) return <FullScreenLoader message="Loading Course"/>

    const isCompleted = (materialId: string): string => {
        const check = completedContents.find(k=>k.material === materialId)
        return check ? "Yes" : "No"
    }

    const markAsCompleteHandler = async (materialId: string) => {
        if (!viewCourseMedia) return
        try {
            await ServiceEnrollment.markStudyMaterialAsComplete(course._id, materialId)
            showToast({
                type:"success",
                message: "Marked course as complete",
            
            })
        } catch (error) {
            showToast({
                type:"error",
                message: "Error marking the material as complete",
                error
            })
        }
    } 

    return (
        <MainLayout title={`Course content ${courseName}`}>
            <div className={`space-y-4 pt-16 ${isLoading ? "disabled-block" : ""}`}>
                <div className="px-4 py-5 sm:p-6">
                    {course.content && course.content.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Added On
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       Completed
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {course.content.map((content: ICourseContent) => (
                                    <tr key={content._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {content.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {content.title}
                                            </div>
                                            {content.description && (
                                                <div className="text-sm text-gray-500">
                                                    {content.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {getContentTypeLabel(content.type)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {content.durationInMinutes ? `${content.durationInMinutes} mins` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(content.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {isCompleted(content._id)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button onClick={()=>{setViewCourseMedia(content); setContentViewerIsOpen(true)}} className="text-indigo-600 hover:text-indigo-900">
                                                    View Content
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            No content available for this course.
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isVisible={isViewingContent && viewCourseMedia !== undefined}
                handleModalClose={() => {setViewCourseMedia(undefined);setContentViewerIsOpen(false); }}
            >
                <Button variant="secondary" onClick={()=>markAsCompleteHandler(viewCourseMedia!._id)} >Mark As Complete</Button>
                <MediaViewer media={viewCourseMedia!} />
                
            </Modal>
        </MainLayout>
    );
};
export default ViewCourseContentPage;