import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography, Paper, LinearProgress, Button, Dialog, DialogContent, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationEffect from './CelebrationEffect';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  duration?: number;
  progress?: number;
  completed?: boolean;
}

interface RewardsProps {
  badges: Badge[];
  progress: number;
  totalStars: number;
}

const Rewards: React.FC<RewardsProps> = ({ badges, progress, totalStars }) => {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState<'confetti' | 'fireworks' | 'stars' | 'rainbow'>('confetti');
  const [celebrationMessage, setCelebrationMessage] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<string>('');
  const [badgeProgress, setBadgeProgress] = useState<Record<string, number>>({});
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);
  const startSoundRef = useRef<HTMLAudioElement | null>(null);
  const tickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload all sounds with fallback
    try {
      completeSoundRef.current = new Audio('/sounds/complete.mp3');
      startSoundRef.current = new Audio('/sounds/start.mp3');
      tickSoundRef.current = new Audio('/sounds/tick.mp3');
    } catch (error) {
      console.log('Sound files not found, using default sounds');
    }

    // Initialize progress for each badge
    const initialProgress = badges.reduce((acc, badge) => {
      acc[badge.id] = badge.progress || 0;
      return acc;
    }, {} as Record<string, number>);
    setBadgeProgress(initialProgress);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [badges]);

  const playSound = useCallback((soundRef: React.RefObject<HTMLAudioElement>) => {
    if (soundRef.current) {
      try {
        soundRef.current.currentTime = 0;
        soundRef.current.play().catch(() => {
          // If sound file not found, use default browser sound
          const audio = new Audio();
          audio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU';
          audio.play().catch(() => {
            console.log('Sound playback not supported');
          });
        });
      } catch (error) {
        console.log('Sound playback failed');
      }
    }
  }, []);

  const getRandomCelebrationType = useCallback(() => {
    const types: Array<'confetti' | 'fireworks' | 'stars' | 'rainbow'> = ['confetti', 'fireworks', 'stars', 'rainbow'];
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  const getCelebrationMessage = useCallback((badgeName: string) => {
    const messages = [
      `Amazing! You've completed ${badgeName}! 🌟`,
      `Fantastic job on ${badgeName}! 🎉`,
      `You're a ${badgeName} champion! 🏆`,
      `Incredible work on ${badgeName}! ⭐`,
      `Super clean! ${badgeName} mastered! 🧼`,
      `Hygiene hero! ${badgeName} complete! 🦸‍♂️`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  const triggerCelebration = useCallback((badgeName: string) => {
    setShowCelebration(true);
    setCelebrationType(getRandomCelebrationType());
    setCelebrationMessage(getCelebrationMessage(badgeName));
    playSound(completeSoundRef);
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  }, [getRandomCelebrationType, getCelebrationMessage, playSound]);

  const startActivity = useCallback((badge: Badge) => {
    if (badge.duration) {
      setActiveBadge(badge.id);
      setTimeLeft(badge.duration);
      setCurrentActivity(badge.name);
      setShowDialog(true);
      setIsPaused(false);
      playSound(startSoundRef);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setActiveBadge(null);
            setShowDialog(false);
            triggerCelebration(badge.name);
            setBadgeProgress(prev => ({
              ...prev,
              [badge.id]: 100
            }));
            return 0;
          }
          // Play tick sound every second
          if (prev % 10 === 0) {
            playSound(tickSoundRef);
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [triggerCelebration, playSound]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
    if (timerRef.current) {
      if (isPaused) {
        startActivity(badges.find(b => b.id === activeBadge)!);
      } else {
        clearInterval(timerRef.current);
      }
    }
  }, [isPaused, activeBadge, badges, startActivity]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Your Cleanliness Journey 🌟
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Progress: {progress}/{totalStars} Stars
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(progress / totalStars) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: badge.unlocked
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.3)',
                  borderRadius: 3,
                  cursor: badge.unlocked ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: badge.unlocked ? 'translateY(-5px)' : 'none',
                    boxShadow: badge.unlocked ? '0 8px 20px rgba(0,0,0,0.2)' : 'none',
                  },
                }}
                onClick={() => badge.unlocked && startActivity(badge)}
              >
                {badgeProgress[badge.id] > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'rgba(76, 175, 80, 0.2)',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${badgeProgress[badge.id]}%`,
                        background: '#4CAF50',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Box>
                )}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {badge.icon}
                  </Typography>
                </motion.div>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    color: badge.unlocked ? '#4CAF50' : 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {badge.description}
                </Typography>
                {badge.duration && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                    Duration: {formatTime(badge.duration)}
                  </Typography>
                )}
                {badgeProgress[badge.id] > 0 && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#4CAF50' }}>
                    Progress: {badgeProgress[badge.id]}%
                  </Typography>
                )}
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Paper>

      <Dialog
        open={showDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            color: 'white',
            borderRadius: 4,
          },
        }}
      >
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" gutterBottom>
              {currentActivity} in Progress! ⏳
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
              <CircularProgress
                variant="determinate"
                value={(timeLeft / (badges.find(b => b.id === activeBadge)?.duration || 1)) * 100}
                size={200}
                thickness={4}
                sx={{
                  color: '#FFD700',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                  {formatTime(timeLeft)}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Keep going! You're doing great! 🌟
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={togglePause}
              sx={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                },
              }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Rewards; 