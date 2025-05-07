import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button, LinearProgress, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationEffect from './CelebrationEffect';

interface GameItem {
  id: string;
  name: string;
  icon: string;
  correct: boolean;
  description?: string;
}

interface InteractiveGameProps {
  type: 'drag-drop' | 'tap-clean' | 'match-pairs';
  title: string;
  items: GameItem[];
  onComplete: () => void;
}

const InteractiveGame: React.FC<InteractiveGameProps> = ({ type, title, items, onComplete }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'confetti' | 'fireworks' | 'stars' | 'rainbow'>('confetti');
  const [celebrationMessage, setCelebrationMessage] = useState<string>('');

  const successSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);
  const matchSoundRef = useRef<HTMLAudioElement | null>(null);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload sounds
    successSoundRef.current = new Audio('/sounds/success.mp3');
    errorSoundRef.current = new Audio('/sounds/error.mp3');
    matchSoundRef.current = new Audio('/sounds/match.mp3');
    completeSoundRef.current = new Audio('/sounds/complete.mp3');
  }, []);

  const playSound = useCallback((soundRef: React.RefObject<HTMLAudioElement>) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {
        console.log('Sound playback not supported or file not found');
      });
    }
  }, []);

  const getRandomCelebrationType = useCallback(() => {
    const types: Array<'confetti' | 'fireworks' | 'stars' | 'rainbow'> = ['confetti', 'fireworks', 'stars', 'rainbow'];
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  const getCelebrationMessage = useCallback((score: number) => {
    const messages = [
      'Amazing! You\'re a Hygiene Hero! 🌟',
      'Fantastic job! You\'re so clean! 🧼',
      'Perfect! You\'re a cleanliness champion! 🏆',
      'Incredible! You\'re a germ-fighting superstar! ⭐',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  const triggerCelebration = useCallback((score: number) => {
    setShowCelebration(true);
    setCelebrationType(getRandomCelebrationType());
    setCelebrationMessage(getCelebrationMessage(score));
    playSound(completeSoundRef);
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  }, [getRandomCelebrationType, getCelebrationMessage, playSound]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleGameOver();
    }
  }, [gameStarted, timeLeft]);

  const handleGameOver = () => {
    setGameStarted(false);
    setFeedback(`Time's up! Your score: ${score}`);
    if (score > 50) {
      triggerCelebration(score);
    }
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleItemClick = (itemId: string) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (type === 'tap-clean') {
      const item = items.find(i => i.id === itemId);
      if (item?.correct) {
        setSelectedItems([...selectedItems, itemId]);
        setScore(prev => prev + 10);
        setFeedback("Great job! Keep cleaning! 🧼");
        playSound(successSoundRef);
        
        if (selectedItems.length + 1 === items.filter(i => i.correct).length) {
          triggerCelebration(score + 10);
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      } else {
        setScore(prev => Math.max(0, prev - 5));
        setFeedback("Oops! That's not dirty! Try again! 🦠");
        playSound(errorSoundRef);
      }
    } else if (type === 'match-pairs') {
      if (flippedCards.length === 1) {
        const firstItem = items.find(i => i.id === flippedCards[0]);
        const secondItem = items.find(i => i.id === itemId);
        
        if (firstItem?.name === secondItem?.name) {
          const newMatchedPairs = [...matchedPairs, flippedCards[0], itemId];
          setMatchedPairs(newMatchedPairs);
          setScore(prev => prev + 20);
          setFeedback("Perfect match! 🎯");
          playSound(matchSoundRef);
          
          if (newMatchedPairs.length === items.length) {
            triggerCelebration(score + 20);
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        } else {
          setScore(prev => Math.max(0, prev - 5));
          setFeedback("Not a match! Try again! 🔄");
          playSound(errorSoundRef);
        }
        setFlippedCards([]);
      } else {
        setFlippedCards([itemId]);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    if (type === 'drag-drop') {
      e.dataTransfer.setData('text/plain', itemId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (type === 'drag-drop') {
      e.preventDefault();
      const itemId = e.dataTransfer.getData('text/plain');
      const item = items.find(i => i.id === itemId);
      
      if (item?.correct && !selectedItems.includes(itemId)) {
        setSelectedItems([...selectedItems, itemId]);
        setScore(prev => prev + 10);
        setFeedback('Perfect! That belongs in the hygiene kit! 🎯');
        playSound(successSoundRef);
        
        if (selectedItems.length + 1 === items.filter(i => i.correct).length) {
          triggerCelebration(score + 10);
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      } else {
        setScore(prev => Math.max(0, prev - 5));
        setFeedback("That doesn't belong in the hygiene kit! Try again! 🧹");
        playSound(errorSoundRef);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderGameContent = () => {
    switch (type) {
      case 'match-pairs':
        return (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleItemClick(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: matchedPairs.includes(item.id)
                      ? 'rgba(76, 175, 80, 0.9)'
                      : flippedCards.includes(item.id)
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.3)',
                    borderRadius: 2,
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: flippedCards.includes(item.id) ? 'rotateY(180deg)' : 'rotateY(0)',
                  }}
                >
                  <Typography variant="h4">
                    {flippedCards.includes(item.id) || matchedPairs.includes(item.id) ? item.icon : '❓'}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>
        );
      default:
        return (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              mb: 3,
            }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                draggable={type === 'drag-drop'}
                onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, item.id)}
                onClick={() => handleItemClick(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <Tooltip title={item.description || item.name} arrow>
                  <span>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: selectedItems.includes(item.id)
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.3)',
                        borderRadius: 2,
                        width: 80,
                        height: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Typography variant="h4">
                        {item.icon}
                      </Typography>
                    </Paper>
                  </span>
                </Tooltip>
              </motion.div>
            ))}
          </Box>
        );
    }
  };

  return (
    <>
      {showCelebration && (
        <CelebrationEffect 
          type={celebrationType} 
          message={celebrationMessage}
        />
      )}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2">
              Score: {score} 🏆
            </Typography>
            <Typography variant="body2">
              Time: {timeLeft}s ⏰
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 60) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
              },
            }}
          />
        </Box>

        {renderGameContent()}

        {type === 'drag-drop' && (
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              p: 3,
              border: '2px dashed rgba(255,255,255,0.5)',
              borderRadius: 2,
              textAlign: 'center',
              mb: 3,
              background: 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <Typography variant="body1">
              Drop hygiene items here! 🎯
            </Typography>
          </Box>
        )}

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: feedback.includes('Great') || feedback.includes('Perfect') ? '#4CAF50' : '#FF6B6B',
                  fontWeight: 600,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {feedback}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
              }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    borderRadius: '50%',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: Math.random(),
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </>
  );
};

export default InteractiveGame; 