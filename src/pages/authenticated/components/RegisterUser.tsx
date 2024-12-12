import { useState } from "react";
import { IUserFormData } from "../../../interfaces/IUserFormData";
import { RoleTypes } from "@lidiayon/sharedlibs";
import Button from "../../../components/common/Button";
import TextInput from "../../../components/common/TextInput";
import { IValidationError } from "../../../interfaces/IValidationError";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import { showToast } from '../../../components/common/Toaster';
import ServiceAuth from "../../../services/ServiceAuth";

const initialFormData: IUserFormData = {
    email: '',
    firstName: '',
    lastName: '',
    role: RoleTypes.STUDENT,
    phoneNumber: '',
    password: "",
    confirmPassword: ""
}

interface IProps {
    selfRegister: boolean
}


const CreateUserPage: React.FC<IProps> = ({ selfRegister }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<IValidationError[] | string | null>(null);
    const [formData, setFormData] = useState<IUserFormData>(initialFormData);

    const handleInputChange = (field: keyof IUserFormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);


        try {

            await ServiceAuth.register(formData)
            setFormData(initialFormData)

            showToast({
                message: 'User created successfully! Admin will activate your account now.',
                type: 'success'
            });

        } catch (error: any) {
            showToast({
                message: 'Error registering user!',
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

    return <>

        <div className="max-w-lg mx-auto p-6">

            {errors && <ApiErrorDisplay errors={errors} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    placeholder="user@example.com"
                />

                <TextInput
                    label="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    placeholder="John"
                />

                <TextInput
                    label="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    placeholder="Doe"
                />

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role')(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {Object.values(RoleTypes).map((role) => {
                            if (selfRegister && role !== RoleTypes.ADMIN) {
                                return <option key={role} value={role}>
                                    {role}
                                </option>
                            } else {
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            }

                        })}
                    </select>
                </div>

                <TextInput
                    label="Phone Number"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    placeholder="+1234567890"
                />

<TextInput
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    placeholder="******"
                />

<TextInput
                    label="Password Again"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    placeholder="******"
                />
                
                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        isFullWidth
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>

    </>
}

export default CreateUserPage;