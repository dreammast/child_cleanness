import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

interface MascotProps {
  message: string;
  position?: 'left' | 'right';
}

const Mascot: React.FC<MascotProps> = ({ message, position = 'right' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: position === 'right' ? 'row' : 'row-reverse',
          alignItems: 'center',
          gap: 2,
          mb: 3,
        }}
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
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: '3rem',
              bgcolor: 'primary.main',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            🧼
          </Avatar>
        </motion.div>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            maxWidth: 300,
            background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            color: 'white',
            borderRadius: 4,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              [position]: -10,
              borderStyle: 'solid',
              borderWidth: '10px 10px 10px 0',
              borderColor: `transparent ${position === 'right' ? '#4CAF50' : 'transparent'} transparent transparent`,
              [position === 'left' ? 'right' : 'left']: -10,
              transform: `translateY(-50%) ${position === 'left' ? 'rotate(180deg)' : ''}`,
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Mascot; 