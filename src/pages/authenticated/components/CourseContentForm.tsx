import React, { useState } from 'react';
import TextInput from '../../../components/common/TextInput';
import TextArea from '../../../components/common/TextArea';
import Button from '../../../components/common/Button';

interface IProps {
    onSubmit: (formData: FormData) => Promise<void>;
    initialData?: {
        title: string;
        description?: string;
        order: number;
        durationInMinutes?: number;
    };
    isLoading?: boolean;
}

const CourseContentForm: React.FC<IProps> = ({
    onSubmit,
    initialData,
    isLoading = false
}) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [order, setOrder] = useState(initialData?.order || 1);
    const [durationInMinutes, setDurationInMinutes] = useState(initialData?.durationInMinutes || 0);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('video/') && selectedFile.type !== 'application/pdf') {
                setFileError('Only video and PDF files are allowed');
                setFile(null);
                return;
            }
            // Validate file size (100MB limit)
            if (selectedFile.size > 100 * 1024 * 1024) {
                setFileError('File size must be less than 100MB');
                setFile(null);
                return;
            }
            setFileError('');
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file && !initialData) {
            setFileError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('order', order.toString());
        if (durationInMinutes > 0) {
            formData.append('durationInMinutes', durationInMinutes.toString());
        }
        if (file) {
            formData.append('file', file);
        }

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                type="text"
                label="Title"
                value={title}
                onChange={(value) => setTitle(value)}
                required
                placeholder="Enter content title"
            />

            <TextArea
                label="Description"
                value={description}
                onChange={(value) => setDescription(value)}
                placeholder="Enter content description"
            />

            <TextInput
                label="Order"
                type="number"
                value={order.toString()}
                onChange={(value) => setOrder(parseInt(value) || 0)}
                required
            />

            <TextInput
                label="Duration (minutes)"
                type="number"
                value={durationInMinutes.toString()}
                onChange={(value) => setDurationInMinutes(parseInt(value) || 0)}
            />

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Upload File {!initialData && '*'}
                </label>
                <input
                    type="file"
                    accept="video/*,.pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                />
                {fileError && (
                    <p className="text-red-500 text-sm mt-1">{fileError}</p>
                )}
                <p className="text-sm text-gray-500">
                    Supported formats: Video files and PDF. Maximum size: 100MB
                </p>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    isFullWidth
                    isLoading={isLoading}
                >
                    {initialData ? 'Update Content' : 'Upload Content'}
                </Button>
            </div>
        </form>
    );
};

export default CourseContentForm;