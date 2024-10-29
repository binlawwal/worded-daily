import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  setUsername: (username: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsEmailVerified(user?.emailVerified ?? false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isUsernameAvailable = async (username: string): Promise<boolean> => {
    const usernameDoc = await getDoc(doc(db, 'usernames', username));
    return !usernameDoc.exists();
  };

  const setUsername = async (username: string) => {
    if (!user) throw new Error('No user logged in');
    
    const available = await isUsernameAvailable(username);
    if (!available) {
      throw new Error('Username is already taken');
    }

    await Promise.all([
      updateProfile(user, { displayName: username }),
      setDoc(doc(db, 'usernames', username), { uid: user.uid }),
      setDoc(doc(db, 'users', user.uid), {
        username,
        email: user.email,
        createdAt: new Date().toISOString(),
      }, { merge: true })
    ]);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user.displayName) {
        toast.error('Please set a username to continue');
      }
    } catch (error) {
      toast.error('Failed to sign in with Google');
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        toast.error('Please verify your email before signing in');
        await sendEmailVerification(result.user);
        await signOut(auth);
      }
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    try {
      const available = await isUsernameAvailable(username);
      if (!available) {
        throw new Error('Username is already taken');
      }

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setUsername(username);
      await sendEmailVerification(user);
      
      toast.success('Verification email sent! Please check your inbox.');
      await signOut(auth);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    }
  };

  const resendVerificationEmail = async () => {
    if (!user) {
      toast.error('No user logged in');
      return;
    }

    try {
      await sendEmailVerification(user);
      toast.success('Verification email sent!');
    } catch (error) {
      toast.error('Failed to send verification email');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send password reset email');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    setUsername,
    resendVerificationEmail,
    resetPassword,
    isEmailVerified,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};