import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Bomb, RotateCcw } from 'lucide-react';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'bomb';
  speed: number;
}

interface GamePageProps {
  onGameComplete: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ onGameComplete }) => {
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const spawnObject = useCallback(() => {
    if (!gameActive) return;
    
    const newObject: GameObject = {
      id: Date.now() + Math.random(),
      x: Math.random() * 85,
      y: -5,
      type: Math.random() < 0.7 ? 'heart' : 'bomb',
      speed: 2 + Math.random() * 2.5,
    };
    
    setGameObjects(prev => [...prev, newObject]);
  }, [gameActive]);

  const moveObjects = useCallback(() => {
    if (!gameActive) return;
    
    setGameObjects(prev => 
      prev.map(obj => ({ ...obj, y: obj.y + obj.speed }))
        .filter(obj => obj.y < 105)
    );
  }, [gameActive]);

  const checkCollisions = useCallback(() => {
    if (!gameActive) return;
    
    setGameObjects(prev => {
      const remaining: GameObject[] = [];
      let newScore = score;
      let hitBomb = false;
      
      prev.forEach(obj => {
        const basketCenter = basketX + 5;
        const objectCenter = obj.x + 2;
        
        if (obj.y >= 75 && obj.y <= 95 && 
            Math.abs(basketCenter - objectCenter) < 8) {
          if (obj.type === 'heart') {
            newScore += 1;
          } else {
            hitBomb = true;
          }
        } else {
          remaining.push(obj);
        }
      });
      
      if (hitBomb) {
        setScore(0);
        setGameOver(true);
        setGameActive(false);
        return [];
      }
      
      if (newScore !== score) {
        setScore(newScore);
        if (newScore >= 10) {
          setGameWon(true);
          setGameActive(false);
        }
      }
      
      return remaining;
    });
  }, [basketX, score, gameActive]);

  useEffect(() => {
    if (!gameActive) return;
    
    const spawnInterval = setInterval(spawnObject, 600);
    const moveInterval = setInterval(moveObjects, 16);
    const collisionInterval = setInterval(checkCollisions, 16);
    
    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
      clearInterval(collisionInterval);
    };
  }, [gameActive, spawnObject, moveObjects, checkCollisions]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(0, Math.min(90, x - 5)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(0, Math.min(90, x - 5)));
  };

  const startGame = () => {
    setGameActive(true);
    setGameWon(false);
    setGameOver(false);
    setScore(0);
    setGameObjects([]);
  };

  const resetGame = () => {
    setGameActive(false);
    setGameWon(false);
    setGameOver(false);
    setScore(0);
    setGameObjects([]);
  };

  if (gameWon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Congratulations!</h2>
          <p className="text-lg text-gray-700 mb-6">
            You collected all 10 hearts! Your love and dedication shines through! 💖
          </p>
          <button
            onClick={onGameComplete}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Continue to Celebration 🎈
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
            Catch My Heart! 💕
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Collect 10 hearts to unlock your special birthday surprise! Avoid the bombs! 💣
          </p>
          
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
              <Heart className="text-red-500" size={24} />
              <span className="text-xl font-bold text-pink-600">{score}/10</span>
            </div>
          </div>
        </div>

        {!gameActive && !gameOver && (
          <div className="text-center mb-8">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Game 🎮
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center mb-8 bg-white/80 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-4xl mb-3">💥</div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">Oops!</h3>
            <p className="text-gray-700 mb-4">You hit a bomb! Try again!</p>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
            >
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
          </div>
        )}

        <div 
          className="relative bg-gradient-to-b from-blue-200 to-blue-300 rounded-3xl overflow-hidden shadow-2xl mx-auto"
          style={{ height: '500px', maxWidth: '600px' }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Game Objects */}
          {gameObjects.map(obj => (
            <div
              key={obj.id}
              className="absolute z-10"
              style={{ 
                left: `${obj.x}%`, 
                top: `${obj.y}%`,
              }}
            >
              {obj.type === 'heart' ? (
                <div className="text-red-500 text-3xl animate-pulse">❤️</div>
              ) : (
                <div className="text-gray-800 text-3xl animate-pulse">💣</div>
              )}
            </div>
          ))}

          {/* Basket */}
          <div
            className="absolute bottom-4 transition-all duration-100 ease-out"
            style={{ 
              left: `${basketX}%`,
            }}
          >
            <div className="text-4xl">🧺</div>
          </div>

          {/* Game area boundaries - for debugging */}
          {gameActive && (
            <div className="absolute inset-0 border-2 border-blue-300 border-dashed opacity-30 pointer-events-none">
            </div>
          )}

          {/* Instructions for mobile */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-blue-800 bg-white/70 px-3 py-1 rounded-full">
              Move to catch hearts! Avoid bombs! 👆
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Move your mouse or finger to control the basket 🧺
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;