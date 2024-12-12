import GuestLayout from "./GuestLayout";
import RegisterUser from "../authenticated/components/RegisterUser";
import { Link } from "react-router-dom";



const RegisterPage = () => {
    return <GuestLayout title="Registration">

        <RegisterUser selfRegister/>

        <div className="flex items-center justify-end space-gap-x">
           

            <Link 
              to="/login" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </div>

    </GuestLayout>
}

export default RegisterPage;