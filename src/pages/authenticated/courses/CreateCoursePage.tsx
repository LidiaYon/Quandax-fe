import { useState } from "react";
import MainLayout from "../MainLayout";
import Button from "../../../components/common/Button";
import TextInput from "../../../components/common/TextInput";
import { IValidationError } from "../../../interfaces/IValidationError";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import { showToast } from '../../../components/common/Toaster';
import { ICourseFormData } from "../../../interfaces/ICourseFormData";
import ServiceCourse from "../../../services/ServiceCourse";
import { RichTextArea } from "../../../components/common/RichTextArea";

const initialFormData: ICourseFormData = {
    title: '',
    code: '',
    tutorId: '',
    duration: 0,
    startDate: '',
    endDate: '',
    enrollmentLimit: 10,
    tags: '',
    description: ''
}


const CreateCoursePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<IValidationError[] | string | null>(null);
    const [formData, setFormData] = useState<ICourseFormData>(initialFormData);

    const handleInputChange = (field: keyof ICourseFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(null)

        try {

            await ServiceCourse.register(formData)
            setFormData(initialFormData)

            showToast({
                message: 'Course created successfully! You can continue creating new courses',
                type: 'success'
            });

        } catch (error: any) {
            showToast({
                message: 'Error registering course!',
                type: "error"
            });
            if (error.errors && Array.isArray(error.errors)) {
                setErrors(error.errors);
            }
            else if (error instanceof Error) {
                setErrors(error.message);
            }
            else {
                setErrors('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return <MainLayout title="Users">

        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

            {errors && <ApiErrorDisplay errors={errors} />}



            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                    required
                    placeholder="Introduction to Physics"
                />

                <TextInput
                    label="Code"
                    type="text"
                    value={formData.code}
                    onChange={handleInputChange('code')}
                    required
                    placeholder="PHY101"
                />


                <TextInput
                    label="Duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange('duration')}
                    required
                    placeholder="1"
                />

                <TextInput
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange('startDate')}
                    placeholder=""
                />

                <TextInput
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange('endDate')}
                    placeholder=""
                />

                <TextInput
                    label="Enrollment Limit"
                    type="number"
                    value={formData.enrollmentLimit}
                    onChange={handleInputChange('enrollmentLimit')}
                    placeholder="10"
                />

                <RichTextArea
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                />

                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        isFullWidth
                        isLoading={isLoading}
                    >
                        Create Course
                    </Button>
                </div>
            </form>
        </div>

    </MainLayout>
}

export default CreateCoursePage;