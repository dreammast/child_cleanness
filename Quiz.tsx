import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji: string;
  explanation: string;
}

const questions: Question[] = [
  {
    question: 'When should you wash your hands?',
    options: ['Before eating', 'After playing outside', 'Both!'],
    correctAnswer: 2,
    emoji: '🧼',
    explanation: 'Washing hands before eating and after playing outside helps keep germs away!',
  },
  {
    question: 'How long should you brush your teeth?',
    options: ['30 seconds', '1 minute', '2 minutes'],
    correctAnswer: 2,
    emoji: '🦷',
    explanation: 'Brushing for 2 minutes helps remove all the germs and keeps your teeth healthy!',
  },
  {
    question: 'What should you do after sneezing?',
    options: ['Wipe on your clothes', 'Use a tissue', 'Do nothing'],
    correctAnswer: 1,
    emoji: '🤧',
    explanation: 'Always use a tissue when sneezing to keep germs from spreading!',
  },
  {
    question: 'How often should you take a bath or shower?',
    options: ['Once a week', 'Every day', 'Every other day'],
    correctAnswer: 1,
    emoji: '🚿',
    explanation: 'Taking a bath or shower every day helps keep your body clean and fresh!',
  },
  {
    question: 'What should you do with your toys after playing?',
    options: ['Leave them on the floor', 'Put them away', 'Hide them under the bed'],
    correctAnswer: 1,
    emoji: '🧸',
    explanation: 'Putting toys away keeps your room neat and prevents accidents!',
  },
  {
    question: 'When should you change your clothes?',
    options: ['Once a week', 'Every day', 'When they get dirty'],
    correctAnswer: 2,
    emoji: '👕',
    explanation: 'Change your clothes when they get dirty to stay clean and fresh!',
  },
  {
    question: 'What should you do before touching food?',
    options: ['Wipe hands on clothes', 'Wash hands with soap', 'Just rinse with water'],
    correctAnswer: 1,
    emoji: '🍎',
    explanation: 'Always wash hands with soap before touching food to keep germs away!',
  },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 10, 
          borderRadius: 5,
          mb: 4,
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main',
          },
        }} 
      />
      
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
                    {questions[currentQuestion].emoji}
                  </Typography>
                </motion.div>
                <Typography variant="h4" gutterBottom>
                  {questions[currentQuestion].question}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup>
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FormControlLabel
                          value={index.toString()}
                          control={<Radio />}
                          label={option}
                          checked={selectedAnswer === index}
                          onChange={() => handleAnswer(index)}
                          sx={{
                            mb: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: selectedAnswer === index
                              ? isCorrect
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(255, 107, 107, 0.1)'
                              : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                        />
                      </motion.div>
                    ))}
                  </RadioGroup>
                </FormControl>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 107, 107, 0.1)',
                        color: isCorrect ? 'success.main' : 'error.main',
                      }}
                    >
                      {questions[currentQuestion].explanation}
                    </Typography>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ textAlign: 'center', py: 4 }}>
              <CardContent>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {score === questions.length ? '🏆' : '🎉'}
                  </Typography>
                </motion.div>
                <Typography variant="h3" gutterBottom>
                  Quiz Complete!
                </Typography>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Your Score: {score} out of {questions.length}
                </Typography>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  {score === questions.length
                    ? "You're a Hygiene Hero! 🌟"
                    : score >= questions.length * 0.7
                    ? "Great job! You're almost a Hygiene Hero! 💪"
                    : 'Keep practicing to become a Hygiene Hero! 💪'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleRestart}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Quiz; 