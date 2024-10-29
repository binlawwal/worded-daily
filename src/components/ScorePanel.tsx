import React from 'react';
import { Flame, Star, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';

const ScorePanel = () => {
  const { 
    score,
    baseScore,
    multiplier,
    streak,
    foundWords,
    words,
    attemptsLeft,
    isGameOver,
    gameEndReason
  } = useGame();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Your Score</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white/80">Words Found:</span>
          <span className="text-white font-bold">{foundWords.length}/{words.length}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="text-red-400" size={20} />
            <span className="text-white/80">Attempts Left:</span>
          </div>
          <span className={`font-bold ${attemptsLeft <= 3 ? 'text-red-400' : 'text-white'}`}>
            {attemptsLeft}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white/80">Base Score:</span>
          <span className="text-white font-bold">{baseScore}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="text-orange-400" size={20} />
            <span className="text-white/80">Streak Bonus:</span>
          </div>
          <span className="text-orange-400 font-bold">×{(1 + streak * 0.1).toFixed(1)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-400" size={20} />
            <span className="text-white/80">Time Multiplier:</span>
          </div>
          <span className="text-yellow-400 font-bold">×{multiplier}</span>
        </div>
        
        {isGameOver && (
          <>
            <div className="h-px bg-white/20 my-4" />
            {gameEndReason && (
              <div className="text-center mb-4">
                <span className={`text-lg font-medium ${
                  gameEndReason.includes('Congratulations') ? 'text-emerald-400' : 'text-orange-400'
                }`}>
                  {gameEndReason}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-lg">
              <span className="text-white">Final Score:</span>
              <span className="text-white font-bold">{score}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScorePanel;