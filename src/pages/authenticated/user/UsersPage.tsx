import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { IUser } from "@lidiayon/sharedlibs";
import ServiceUser from "../../../services/ServiceUser";
import { showToast } from "../../../components/common/Toaster";
import { userHasPower } from "../../../utils/userPowers";
import { useAppSelector } from "../../../store/hooks/hooks";

const styles = {
  th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
}


const UsersPage = () => {
  const loggedInUser = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ServiceUser.getAllUsers()
      .then(data => setUsers(data))
      .catch(error => {
        setUsers([]);
        showToast({
          message: 'Sorry there was an error getting you list of users',
          type: 'error',
          error
        });
      });
  }, []);

  const updateUserStatus = async (userId: string, currentStatus: boolean, index: number) => {
    if (loggedInUser?._id === userId) {
      showToast({
        type:"error",
        message: "You cant set status your own account"
      })
      return;
    }
      try {
        setLoading(true)
        const newStatus = !currentStatus
        await ServiceUser.setUserStatus({
          userId,
          newStatus
        })
        const updatedUsers = [...users]
        updatedUsers[index].active = newStatus
        setUsers(updatedUsers)

        showToast({
          type:"success",
          message: "Status updated successfully"
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        showToast({
          type: "error",
          message: "there was an error updating the status"
        })
      }
  }

  return (
    <MainLayout title="Users">
      <div className={`space-y-4 pt-16 ${loading ? "disabled-block" : ""}`}>
        <ActionBar>
          {userHasPower("createUser", loggedInUser?.role) && (
            <Button variant="primary" onClick={() => navigate("/users/add")}>
              Add New User
            </Button>
          )}

        </ActionBar>


        <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className={styles.th}>Name</th>
                <th scope="col" className={styles.th}>Email</th>
                <th scope="col" className={styles.th}>Role</th>
                <th scope="col" className={styles.th}>Status</th>
                <th scope="col" className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => navigate(`/users/${user._id}`)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {user.firstName} {user.lastName}
                    </button>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs rounded-full ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {userHasPower("setUserStatus", loggedInUser?.role) && (
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>updateUserStatus(
                          user._id,
                          user.active,
                          index
                        )}>
                          {user.active ? "Deactivate":"Activate"}
                        </button>

                      </div>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default UsersPage;