import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontFamily: 'Fredoka One',
            }}
          >
            Clean Kids Club 🧼
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/quiz"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Quiz
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
            sx={{ mx: 1 }}
          >
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ flex: 1, py: 4 }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 