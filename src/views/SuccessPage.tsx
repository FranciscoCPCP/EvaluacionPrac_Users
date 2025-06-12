import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const SuccessPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Redirect to home if no user data exists
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl text-center">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white">
          <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Registration Successful!</h1>
          <p className="mt-2 text-emerald-100">Your account has been created</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-emerald-800 mb-2">Account Details</h2>
              <div className="space-y-2 text-left">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Name:</span> {user.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900">Account Type:</span> {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700">
              We've sent a confirmation email to <span className="font-medium">{user.email}</span> with instructions to verify your account and get started.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/dashboard" className="block w-full">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center">
                <span>Continue to Dashboard</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Need help? <a href="#" className="text-indigo-600 hover:underline">Contact Support</a></p>
      </div>
    </div>
  );
};

export default SuccessPage;