import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Paper, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/common/Mascot';
import Rewards from '../components/common/Rewards';
import InteractiveGame from '../components/common/InteractiveGame';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState<'drag-drop' | 'tap-clean' | 'match-pairs'>('drag-drop');

  const tips = [
    {
      title: 'Wash Your Hands',
      description: 'Wash hands for 20 seconds with soap and water!',
      emoji: '🧼',
      color: '#4CAF50',
    },
    {
      title: 'Brush Your Teeth',
      description: 'Brush twice a day for a bright smile!',
      emoji: '🦷',
      color: '#2196F3',
    },
    {
      title: 'Keep Your Room Clean',
      description: 'A clean room is a happy room!',
      emoji: '🧹',
      color: '#FF9800',
    },
  ];

  const rewards = [
    {
      id: 'hand-washer',
      name: 'Hand Washer',
      icon: '🧼',
      description: 'Master the art of proper hand washing',
      unlocked: true,
      duration: 30, // 30 seconds
    },
    {
      id: 'tooth-brusher',
      name: 'Tooth Brusher',
      icon: '🦷',
      description: 'Learn to brush your teeth properly',
      unlocked: true,
      duration: 300, // 5 minutes
    },
    {
      id: 'room-cleaner',
      name: 'Room Cleaner',
      icon: '🧹',
      description: 'Keep your room clean and organized',
      unlocked: true,
      duration: 600, // 10 minutes
    },
    {
      id: 'hygiene-hero',
      name: 'Hygiene Hero',
      icon: '🦸‍♂️',
      description: 'Complete all hygiene challenges',
      unlocked: true,
    },
  ];

  const gameItems = [
    { 
      id: '1', 
      name: 'Soap', 
      icon: '🧼', 
      correct: true,
      description: 'Soap helps remove germs and dirt from your hands!'
    },
    { 
      id: '2', 
      name: 'Toothbrush', 
      icon: '🦷', 
      correct: true,
      description: 'Brush your teeth twice a day for a healthy smile!'
    },
    { 
      id: '3', 
      name: 'Towel', 
      icon: '🧺', 
      correct: true,
      description: 'Use a clean towel to dry your hands and body!'
    },
    { 
      id: '4', 
      name: 'Toy', 
      icon: '🧸', 
      correct: false,
      description: 'Toys are fun but not for cleaning!'
    },
    { 
      id: '5', 
      name: 'Candy', 
      icon: '🍬', 
      correct: false,
      description: 'Candy is a treat, not a cleaning tool!'
    },
  ];

  const matchPairsItems = [
    { id: '1', name: 'Hand Washing', icon: '🧼', correct: true, description: 'Wash hands for 20 seconds!' },
    { id: '2', name: 'Hand Washing', icon: '🧼', correct: true, description: 'Wash hands for 20 seconds!' },
    { id: '3', name: 'Tooth Brushing', icon: '🦷', correct: true, description: 'Brush twice a day!' },
    { id: '4', name: 'Tooth Brushing', icon: '🦷', correct: true, description: 'Brush twice a day!' },
    { id: '5', name: 'Bathing', icon: '🚿', correct: true, description: 'Take a bath or shower daily!' },
    { id: '6', name: 'Bathing', icon: '🚿', correct: true, description: 'Take a bath or shower daily!' },
    { id: '7', name: 'Nail Care', icon: '💅', correct: true, description: 'Keep nails clean and trimmed!' },
    { id: '8', name: 'Nail Care', icon: '💅', correct: true, description: 'Keep nails clean and trimmed!' },
  ];

  const handleGameComplete = () => {
    setShowGame(false);
    // Add sound effect
    if (isSoundOn) {
      try {
        const audio = new Audio('/sounds/success.mp3');
        audio.play().catch(() => {
          // Silently handle any playback errors
          console.log('Sound playback not supported or file not found');
        });
      } catch (error) {
        // Silently handle any audio creation errors
        console.log('Audio creation failed');
      }
    }
  };

  return (
    <Box>
      {/* Sound Toggle */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <IconButton
          onClick={() => setIsSoundOn(!isSoundOn)}
          sx={{
            background: 'rgba(255,255,255,0.9)',
            '&:hover': { background: 'rgba(255,255,255,1)' },
          }}
        >
          {isSoundOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #4CAF50 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
            animation: 'pulse 3s infinite',
          },
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient 3s linear infinite',
                mb: 2,
                position: 'relative',
                '@keyframes gradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                  borderRadius: '2px',
                }
              }}
            >
              Welcome to the Clean Kids Club! 🎉
            </Typography>
          </motion.div>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Let's learn about staying clean and healthy together!
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/quiz')}
              sx={{ 
                fontSize: '1.2rem',
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite',
                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FFA500, #FFD700, #FFA500)',
                  boxShadow: '0 6px 25px rgba(255, 215, 0, 0.4)',
                }
              }}
            >
              Let's Get Started!
            </Button>
          </motion.div>
        </motion.div>
      </Box>

      {/* Mascot Welcome */}
      <Mascot message="Hi! I'm Bubbles! Let's learn how to stay clean and healthy! 🧼" />

      {/* Tips Section */}
      <Typography 
        variant="h2" 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Cleanliness Tips
      </Typography>
      <Grid container spacing={4}>
        {tips.map((tip, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  background: `linear-gradient(135deg, ${tip.color}15 0%, ${tip.color}30 100%)`,
                  border: `1px solid ${tip.color}30`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 8px 20px ${tip.color}30`,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
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
                    <Typography variant="h1" sx={{ mb: 2, fontSize: '3rem' }}>
                      {tip.emoji}
                    </Typography>
                  </motion.div>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                      color: tip.color,
                      fontWeight: 600,
                    }}
                  >
                    {tip.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Games Section */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Let's Play! 🎮
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setGameType('drag-drop');
                setShowGame(true);
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.2)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Pack the Hygiene Kit! 🎒
                </Typography>
                <Typography variant="body1">
                  Drag and drop the correct items into your hygiene kit!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setGameType('tap-clean');
                setShowGame(true);
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.2)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Scrub the Germs Away! 🧼
                </Typography>
                <Typography variant="body1">
                  Tap on the dirty spots to clean them up!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setGameType('match-pairs');
                setShowGame(true);
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.2)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Match the Hygiene Pairs! 🎯
                </Typography>
                <Typography variant="body1">
                  Find matching pairs of hygiene items!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Rewards Section */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Rewards
          badges={rewards}
          progress={2}
          totalStars={5}
        />
      </Box>

      {/* Video Section */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Watch and Learn! 📺
        </Typography>
        <Grid container spacing={4}>
          {/* First Video */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/6JIjNjgrY6Q"
                    title="Cleanliness Education Video 1"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mt: 3, 
                    textAlign: 'center',
                    color: '#4CAF50',
                    fontWeight: 600,
                  }}
                >
                  Basic Hygiene Tips 🧼
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                  Learn the basics of staying clean and healthy!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Second Video */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.2)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/bN36nh-2tuI"
                    title="Cleanliness Education Video 2"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mt: 3, 
                    textAlign: 'center',
                    color: '#4CAF50',
                    fontWeight: 600,
                  }}
                >
                  Advanced Health Tips 🌟
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                  Discover more ways to stay healthy and clean!
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Game Modal */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                width: '90%',
                maxWidth: 600,
              }}
            >
              <InteractiveGame
                type={gameType}
                title={
                  gameType === 'drag-drop' 
                    ? 'Pack the Hygiene Kit! 🎒' 
                    : gameType === 'tap-clean'
                    ? 'Scrub the Germs Away! 🧼'
                    : 'Match the Hygiene Pairs! 🎯'
                }
                items={gameType === 'match-pairs' ? matchPairsItems : gameItems}
                onComplete={handleGameComplete}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Home; 