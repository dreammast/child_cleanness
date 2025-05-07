import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const characters = [
  {
    name: 'Bubbles',
    role: 'Hand Washing Expert',
    emoji: '🧼',
    description: 'I love teaching kids about proper hand washing!',
  },
  {
    name: 'Sparkle',
    role: 'Dental Health Guide',
    emoji: '🦷',
    description: 'Keeping teeth clean and healthy is my specialty!',
  },
  {
    name: 'Tidy',
    role: 'Organization Pro',
    emoji: '🧹',
    description: 'I help kids keep their spaces neat and organized!',
  },
];

const About: React.FC = () => {
  return (
    <Box>
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          About Clean Kids Club
        </Typography>
        <Typography variant="h5" align="center" sx={{ mb: 6 }}>
          We help kids learn about cleanliness and health in a fun way! 🌟
        </Typography>
      </motion.div>

      {/* Mission Statement */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Clean Kids Club, we believe that learning about cleanliness and health should be fun and engaging! 
              We use interactive games, quizzes, and colorful characters to teach important habits that will last a lifetime.
            </Typography>
            <Typography variant="body1">
              Our goal is to make every child a Hygiene Hero! 🦸‍♂️
            </Typography>
          </motion.div>
        </CardContent>
      </Card>

      {/* Characters Section */}
      <Typography variant="h2" align="center" sx={{ mb: 4 }}>
        Meet Our Characters
      </Typography>
      <Grid container spacing={4}>
        {characters.map((character, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: '3rem',
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  {character.emoji}
                </Avatar>
                <Typography variant="h4" gutterBottom>
                  {character.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {character.role}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {character.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About; 