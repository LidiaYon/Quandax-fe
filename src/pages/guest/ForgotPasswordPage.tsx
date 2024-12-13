import { Link } from "react-router-dom";
import GuestLayout from "./GuestLayout";
import { FormEvent, useState } from "react";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";
import ServiceAuth from "../../services/ServiceAuth";
import { IForgotPasswordRequest } from "../../interfaces/IAuth";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError('');
      
      try {
        const request: IForgotPasswordRequest = {
          email,
        }
        await ServiceAuth.forgotPassword(request)
        setSubmitted(true);
      } catch (err) {
        setError('Unable to process your request. Please try again.');
      }
    };
  
    if (submitted) {
      return (
        <GuestLayout
          title="Check your email"
          subtitle="We have sent you password reset instructions"
        >
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              If you don't receive an email within a few minutes, please check your spam folder.
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Return to login
              </Link>
            </div>
          </div>
        </GuestLayout>
      );
    }
  
    return (
      <GuestLayout
        title="Forgot password?"
        subtitle="Enter your email to reset your password"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
              {error}
            </div>
          )}
  
          <div>
            <div className="mt-1">
              <TextInput 
              label="Email" 
              type="email"
              value={email} 
              onChange={(text) => setEmail(text)}
              placeholder="you@example.com"
              required 
            />
            </div>
          </div>
  
          <div>
          <Button
            type="submit"
            variant="primary"
            isFullWidth
            disabled={email === ""}
          >
           Reset password
          </Button>
          
          </div>
  
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      </GuestLayout>
    );
  };