import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-sky-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <UserCircle2 className="h-16 w-16 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Welcome to UserFlow</h1>
          <p className="text-blue-100 mt-2">Create your account to get started</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Why join us?</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Access to exclusive content and features</span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Personalized experience based on preferences</span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Connect with our community of users</span>
              </li>
            </ul>
          </div>
          
          <Link to="/register" className="block w-full">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Create Account
            </button>
          </Link>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2023 UserFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;