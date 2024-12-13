import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { showToast } from "../../../components/common/Toaster";
import ServiceCourse from "../../../services/ServiceCourse";
import { userHasPower } from "../../../utils/userPowers";
import { useAppSelector } from "../../../store/hooks/hooks";
import { formatDate, getContentTypeLabel } from "../../../utils/common.utils";
import CourseContentForm from "../components/CourseContentForm";
import Modal from "../../../components/common/Modal";
import FullScreenLoader from "../../../components/common/FullScreenLoader";
import { ICourse } from "../../../interfaces/ICourse";
import { ICourseContent } from "../../../interfaces/ICourseContent";



const CourseContentPage = () => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();
    const { id } = useParams(); //this course content.
    const [course, setCourse] = useState<ICourse | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContentUpload = async (formData: FormData) => {
        try {
            setIsSubmitting(true);
            await ServiceCourse.addCourseContent(id!, formData);
            showToast({
                message: 'Content uploaded successfully',
                type: 'success'
            });
            setIsUploadModalOpen(false);
            // Refresh course data
            if (id) {
                const updatedCourse = await ServiceCourse.getCourse(id);
                setCourse(updatedCourse);
            }
        } catch (error) {
            showToast({
                message: 'Error uploading content',
                type: 'error',
                error
            });
        } finally {
            setIsSubmitting(false);
        }
    };



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

    if (!course) return <FullScreenLoader />;

    const handleDeleteContent = async (contentId: string) => {
        if (confirm("Are you sure you want to delete the content. It is permanent.")){
            try {
                const response = await ServiceCourse.deleteCourseContent(id!, contentId)
                if (response){
                    showToast({
                        type:"success",
                        message: "Content deleted"
                    })
                } else {
                    showToast({
                        type:"error",
                        message: "Erorr handling delete content"
                    })
                }
            } catch (error) {
                showToast({
                    type:"error",
                    message: "Erorr handling delete content"
                })
            }
        }
       

    }
    return (
        <MainLayout title={`${course.title}`}>
            <div className="space-y-4 pt-16">
                <ActionBar>
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                        Back to Courses List
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/courses/${course._id}`)}>
                        Back to Course Information
                    </Button>
                    {userHasPower("manageCourseContent", user?.role) && (
                        <Button variant="outline" onClick={() => setIsUploadModalOpen(true)}>
                            Upload Content
                        </Button>
                    )}
                </ActionBar>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{course.title}</h3>
                    </div>

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
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        View
                                                    </button>
                                                 
                                                    {userHasPower("manageCourseContent", user?.role) && (
                                                        <button className="text-red-600 hover:text-red-900" onClick={()=>handleDeleteContent(content._id)}>
                                                            Delete
                                                        </button>
                                                    )}
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

            </div>
            <Modal
                isVisible={isUploadModalOpen}
                handleModalClose={() => setIsUploadModalOpen(false)}
            >
                <CourseContentForm
                    onSubmit={handleContentUpload}
                    isLoading={isSubmitting}
                />
            </Modal>
        </MainLayout>
    );
};

export default CourseContentPage;