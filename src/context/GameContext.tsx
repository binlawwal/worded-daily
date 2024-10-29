import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, themes } from '../data/themes';
import { useAuth } from './AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Position {
  row: number;
  col: number;
}

interface GameContextType {
  words: string[];
  foundWords: string[];
  score: number;
  baseScore: number;
  multiplier: number;
  streak: number;
  timeRemaining: number;
  attemptsLeft: number;
  grid: string[];
  currentTheme: Theme;
  isGameOver: boolean;
  formattedTime: string;
  gameEndReason: string | null;
  checkWord: (selectedIndices: number[]) => void;
}

// ... [previous helper functions remain the same] ...

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [baseScore, setBaseScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [streak, setStreak] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [grid, setGrid] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameEndReason, setGameEndReason] = useState<string | null>(null);

  const score = Math.floor(baseScore * multiplier * (1 + streak * 0.1));

  useEffect(() => {
    setGrid(generateGrid(currentTheme.words));
  }, [currentTheme]);

  const endGame = async (reason: string) => {
    setIsGameOver(true);
    setGameEndReason(reason);

    if (user) {
      // Save score to leaderboard
      await setDoc(doc(db, 'scores', `${user.uid}_${Date.now()}`), {
        userId: user.uid,
        username: user.displayName,
        score,
        foundWords: foundWords.length,
        totalWords: currentTheme.words.length,
        theme: currentTheme.id,
        timestamp: new Date().toISOString()
      });
    }
  };

  // ... [rest of the context implementation remains the same] ...

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};