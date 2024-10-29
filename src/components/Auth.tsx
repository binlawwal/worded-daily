import React, { useState } from 'react';
import { LogIn, Mail, Lock, User, Github, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showResetPassword) {
      await resetPassword(email);
      setShowResetPassword(false);
      return;
    }
    if (isSignUp) {
      await signUpWithEmail(email, password, username);
    } else {
      await signInWithEmail(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {showResetPassword 
              ? 'Reset Password'
              : isSignUp 
                ? 'Create Account' 
                : 'Welcome Back'}
          </h2>
          <p className="text-white/60">
            {showResetPassword
              ? 'Enter your email to reset your password'
              : isSignUp
                ? 'Sign up to start playing'
                : 'Sign in to continue your game'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && !showResetPassword && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/40"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/40"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {!showResetPassword && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/40"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
          >
            {showResetPassword ? (
              <>
                <KeyRound size={20} />
                <span>Reset Password</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        {!showResetPassword && (
          <>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/40">Or continue with</span>
                </div>
              </div>

              <button
                onClick={() => signInWithGoogle()}
                className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center space-x-2"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span>Google</span>
              </button>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-white/60">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setShowResetPassword(false);
                  }}
                  className="ml-2 text-indigo-400 hover:text-indigo-300"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
              {!isSignUp && (
                <button
                  onClick={() => setShowResetPassword(true)}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Forgot your password?
                </button>
              )}
            </div>
          </>
        )}

        {showResetPassword && (
          <button
            onClick={() => setShowResetPassword(false)}
            className="mt-4 text-center w-full text-indigo-400 hover:text-indigo-300 text-sm"
          >
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;