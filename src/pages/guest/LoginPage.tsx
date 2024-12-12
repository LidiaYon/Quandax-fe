import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuestLayout from './GuestLayout';
import TextInput from '../../components/common/TextInput';
import HelperText from '../../components/common/HelperText';
import Button from '../../components/common/Button';
import { ILoginRequest, IUser, RoleTypes } from '@lidiayon/sharedlibs';
import ServiceAuth from '../../services/ServiceAuth';
import { useAppDispatch } from '../../store/hooks/hooks';
import { setUser } from '../../store/features/userSlice';
import { saveToken } from '../../utils/session.utils';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false)
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError('');
      setLoggingIn(true)
      try {
        const loginDetails: ILoginRequest = {
          email,
          password
        }
        const result = await ServiceAuth.login(loginDetails)
        saveToken(result.token)
        const { user } = result
        const iUser: Partial<IUser> = {
          _id: user.id,
          role: user.role as RoleTypes,
          firstName: user.firstName,
          lastName: user.lastName
        }
        setLoggingIn(false)
        dispatch(setUser(iUser));
        if (user.role === RoleTypes.ADMIN) {
          navigate("/admin")
        } else if (user.role === RoleTypes.TUTOR) {
          navigate("/tutor")
        } else {
          navigate("/student")
        }
      } catch (err) {
        setError('Invalid email or password');
        setLoggingIn(false)

      }
    };
  
    return (
      <GuestLayout
        title="Welcome"
        subtitle="Sign in to your account"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <HelperText text={error} type="error" />}
          
          <div className="space-y-4">
            <TextInput 
              label="Email" 
              type="text"
              value={email} 
              onChange={(text) => setEmail(text)}
              placeholder="you@example.com"
              required 
            />
  
            <TextInput 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(text) => setPassword(text)}
              placeholder="••••••••"
              required
            />
          </div>
  
          <div className="flex items-center justify-end space-gap-x">
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>

            <Link 
              to="/register" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </div>
  
          <Button
            type="submit"
            variant="primary"
            isFullWidth
            onClick={()=>console.log("")}
            disabled={email === "" || password === ""}
            isLoading={loggingIn}
          >
            Sign in
          </Button>
        </form>
      </GuestLayout>
    );
  };

