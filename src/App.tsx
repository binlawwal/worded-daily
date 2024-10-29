import React from 'react';
import { Timer, Trophy, Users, Medal } from 'lucide-react';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import ScorePanel from './components/ScorePanel';
import Auth from './components/Auth';
import SaveScore from './components/SaveScore';
import { GameProvider, useGame } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function GameContent() {
  const { currentTheme, formattedTime, multiplier, timeRemaining, isGameOver } = useGame();
  const { user, logout } = useAuth();

  const getMultiplierClass = () => {
    if (timeRemaining <= 30) return 'text-red-400';
    if (timeRemaining <= 120) return 'text-orange-400';
    if (timeRemaining <= 300) return 'text-yellow-400';
    if (timeRemaining <= 600) return 'text-emerald-400';
    return 'text-white/60';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white tracking-tight">WordMaster</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{user.displayName}</p>
                    <button
                      onClick={logout}
                      className="text-white/60 text-xs hover:text-white/80"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => window.showAuthModal?.()}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
                >
                  <Users size={20} />
                  <span>Sign In</span>
                </button>
              )}
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition">
                <Trophy size={20} />
                <span>Leaderboard</span>
              </button>
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition">
                <Medal size={20} />
                <span>Achievements</span>
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center space-x-3">
                <img 
                  src={currentTheme.icon}
                  alt={currentTheme.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{currentTheme.name}</p>
                  <p className="text-white/60 text-xs">{currentTheme.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <Timer size={16} className="text-white" />
                <span className="text-white text-sm">{formattedTime}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">Bonus Multiplier:</span>
              <span className={`font-bold ${getMultiplierClass()}`}>×{multiplier}</span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GameBoard />
          </div>
          <div className="space-y-8">
            <ScorePanel />
            <Leaderboard />
          </div>
        </main>
      </div>
      
      {isGameOver && !user && <SaveScore />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <GameContent />
      </GameProvider>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;