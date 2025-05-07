import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

interface CelebrationEffectProps {
  type: 'confetti' | 'fireworks' | 'stars' | 'rainbow';
  message?: string;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ type, message }) => {
  const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
  const emojis = ['🎉', '🎊', '🌟', '🏆', '🎯', '💫', '✨', '🎨'];

  const renderConfetti = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            background: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: 'linear',
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </Box>
  );

  const renderFireworks = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {[...Array(20)].map((_, j) => (
            <motion.div
              key={j}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                background: colors[Math.floor(Math.random() * colors.length)],
                borderRadius: '50%',
              }}
              animate={{
                x: [0, Math.cos(j * 18) * 100],
                y: [0, Math.sin(j * 18) * 100],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1,
                ease: 'easeOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      ))}
    </Box>
  );

  const renderStars = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
    </Box>
  );

  const renderRainbow = () => (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {colors.map((color, i) => (
        <motion.div
          key={i}
          style={{
            width: '100%',
            height: '20px',
            background: color,
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
          }}
        />
      ))}
      {message && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10000,
            }}
          >
            {message}
          </Typography>
        </motion.div>
      )}
    </Box>
  );

  switch (type) {
    case 'confetti':
      return renderConfetti();
    case 'fireworks':
      return renderFireworks();
    case 'stars':
      return renderStars();
    case 'rainbow':
      return renderRainbow();
    default:
      return null;
  }
};

export default CelebrationEffect; 