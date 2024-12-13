import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import ServiceUser from "../../../services/ServiceUser";
import { showToast } from "../../../components/common/Toaster";
import FullScreenLoader from "../../../components/common/FullScreenLoader";
import { IUser } from "../../../interfaces/IUser";



const UserDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (id) {
            ServiceUser.getUser(id)
                .then(data => setUser(data))
                .catch(error => {
                    showToast({
                        message: 'Error loading user details',
                        type: 'error',
                        error
                    });
                    navigate('/users');
                });
        }
    }, [id, navigate]);

    if (!user) return <FullScreenLoader message="Loading User Details"/>;

    return (
        <MainLayout title={`${user.firstName} ${user.lastName}`}>
            <div className="space-y-4 pt-16">
                <ActionBar>
                    <Button variant="outline" onClick={() => navigate("/users")}>
                        Back to Users
                    </Button>
                </ActionBar>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.firstName} {user.lastName}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Role</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.role}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                                    <span className={`px-2 py-1 inline-flex text-xs rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.active ? 'Active' : 'Inactive'}
                                    </span>
                                </dd>
                            </div>
                            {user.phoneNumber && (
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phoneNumber}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserDetailsPage;