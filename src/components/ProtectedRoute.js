import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Загрузка...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Доступ запрещен
        </Typography>
        <Typography variant="body1" paragraph>
          Пожалуйста, войдите в систему для доступа к этой странице.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;