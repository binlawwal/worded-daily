import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

interface Direction {
  dx: number;
  dy: number;
}

interface Position {
  row: number;
  col: number;
}

const GameBoard = () => {
  const { words, foundWords, grid, checkWord } = useGame();
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<Direction | null>(null);

  const getPosition = (index: number): Position => ({
    row: Math.floor(index / 10),
    col: index % 10
  });

  const getDirection = (from: number, to: number): Direction | null => {
    const fromPos = getPosition(from);
    const toPos = getPosition(to);

    const dx = Math.sign(toPos.col - fromPos.col);
    const dy = Math.sign(toPos.row - fromPos.row);

    // Only allow horizontal, vertical, or diagonal movements
    if (dx === 0 && dy === 0) return null;
    return { dx, dy };
  };

  const isAligned = (start: number, current: number, direction: Direction): boolean => {
    const startPos = getPosition(start);
    const currentPos = getPosition(current);
    
    // Calculate the difference in rows and columns
    const rowDiff = currentPos.row - startPos.row;
    const colDiff = currentPos.col - startPos.col;
    
    // For horizontal movement (dx = ±1, dy = 0)
    if (direction.dx !== 0 && direction.dy === 0) {
      return rowDiff === 0;
    }
    
    // For vertical movement (dx = 0, dy = ±1)
    if (direction.dx === 0 && direction.dy !== 0) {
      return colDiff === 0;
    }
    
    // For diagonal movement (dx = ±1, dy = ±1)
    if (Math.abs(direction.dx) === 1 && Math.abs(direction.dy) === 1) {
      return Math.abs(rowDiff) === Math.abs(colDiff);
    }
    
    return false;
  };

  const isConsistentWithDirection = (newIndex: number): boolean => {
    if (selectedCells.length < 1) return true;
    
    const startCell = selectedCells[0];
    const newDirection = getDirection(startCell, newIndex);
    
    if (!dragDirection && newDirection) {
      return true;
    }

    if (!dragDirection || !newDirection) return false;

    // Check if directions match exactly
    if (dragDirection.dx !== newDirection.dx || dragDirection.dy !== newDirection.dy) {
      return false;
    }

    // Check if the new cell is properly aligned with the established direction
    return isAligned(startCell, newIndex, dragDirection);
  };

  const handleMouseDown = (index: number) => {
    setIsDragging(true);
    setSelectedCells([index]);
    setDragDirection(null);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && !selectedCells.includes(index)) {
      const newDirection = selectedCells.length === 1 
        ? getDirection(selectedCells[0], index)
        : dragDirection;

      if (newDirection && isConsistentWithDirection(index)) {
        setDragDirection(newDirection);
        setSelectedCells(prev => [...prev, index]);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      checkWord(selectedCells);
      setIsDragging(false);
      setSelectedCells([]);
      setDragDirection(null);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setSelectedCells([]);
        setDragDirection(null);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div 
        className="grid grid-cols-10 gap-1 select-none"
        onMouseLeave={() => {
          if (isDragging) {
            setSelectedCells([]);
            setDragDirection(null);
          }
        }}
      >
        {grid.map((letter, index) => (
          <button
            key={index}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
            className={`
              aspect-square rounded-md text-lg font-semibold
              ${
                selectedCells.includes(index)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }
              transition-colors duration-200
            `}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-white text-xl font-semibold mb-4">
          Found Words ({foundWords.length}/{words.length})
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {words.map((word, index) => (
            <div
              key={index}
              className={`
                rounded-lg p-3
                ${foundWords.includes(word)
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-white/10 text-white/50'}
              `}
            >
              {foundWords.includes(word) ? word : '?'.repeat(word.length)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;