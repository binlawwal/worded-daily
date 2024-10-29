import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';

const SaveScore = () => {
  const { score, foundWords, words } = useGame();
  const { signInWithGoogle } = useAuth();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <div className="text-center">
          <Trophy className="mx-auto text-yellow-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Great Game!</h2>
          <div className="mb-6 space-y-2">
            <p className="text-white/80">
              You found {foundWords.length} out of {words.length} words
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Star className="text-yellow-400" size={20} />
              <p className="text-2xl font-bold text-white">{score} points</p>
            </div>
          </div>
          
          <p className="text-white/60 mb-8">
            Sign in to save your score and compete on the leaderboard!
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => signInWithGoogle()}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center space-x-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            
            <button
              onClick={() => window.showAuthModal?.()}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Sign Up with Email
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveScore;