import { Link } from "react-router-dom"
import { useAppSelector } from "../../../store/hooks/hooks";
import { userHasPower } from "../../../utils/userPowers";

const styles = {
  link: "block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md",
}

export const SideBar = () => {
  const user = useAppSelector((state) => state.user.user);


  return <aside className="w-64 fixed h-full bg-[#629af8] shadow-sm pt-16">
    <nav className="px-4">
      <div className="space-y-1">
        <Link
          to="/dashboard"
          className={styles.link}
        >
          Dashboard
        </Link>

        {userHasPower("viewUsers", user?.role!) && (
          <Link
            to="/users"
            className={styles.link}
          >
            Users
          </Link>
        )}

        {userHasPower("viewCourses", user?.role!) && (
          <Link
            to="/courses"
            className={styles.link}
          >
            Courses
          </Link>
        )}


    {userHasPower("manageCourseEnrollments", user?.role!) && (
          <Link
            to="/enrollments"
            className={styles.link}
          >
            Enrollments
          </Link>
        )}



        <Link
          to="/profile"
          className={styles.link}
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className={styles.link}
        >
          Settings
        </Link>
      </div>
    </nav>
  </aside>
}