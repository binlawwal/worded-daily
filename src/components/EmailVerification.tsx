import React from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EmailVerification = () => {
  const { user, resendVerificationEmail, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-full max-w-md text-center">
        <Mail className="mx-auto text-white w-16 h-16 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Verify Your Email</h2>
        <p className="text-white/60 mb-6">
          We've sent a verification email to{' '}
          <span className="text-white font-medium">{user?.email}</span>
        </p>
        <p className="text-white/60 mb-8">
          Please check your inbox and click the verification link to continue.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={resendVerificationEmail}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>Resend Verification Email</span>
          </button>
          
          <button
            onClick={logout}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;