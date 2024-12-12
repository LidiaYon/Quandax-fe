import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components/common/Logo"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { clearUser } from "../../../store/features/userSlice";
import { deleteToken } from "../../../utils/session.utils";


export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteToken()
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">
            Welcome <strong>{user?.firstName} {user?.lastName}</strong>,
          </span>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
