import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  Book as BookIcon,
  Email as EmailIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [personalDictionary, setPersonalDictionary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchPersonalDictionary();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const response = await authAPI.get('/api/profile/');
      setProfileData(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке профиля:', error);
      setError('Не удалось загрузить данные профиля');
    }
  };

  const fetchPersonalDictionary = async () => {
    try {
      const response = await authAPI.get('/api/personal-dictionary/');
      setPersonalDictionary(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке словаря:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Для просмотра профиля необходимо войти в систему
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={3}>
          <Stack spacing={3}>
            <Box>
              <Paper>
                <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: '#2563EB',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getInitials(user?.user?.username)}
                  </Avatar>
                  
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {user?.user?.username}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Участник Sinosphere
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<LogoutIcon />}
                      onClick={logout}
                      fullWidth
                    >
                      Выйти
                    </Button>
                  </Box>
                </CardContent>
              </Paper>
            </Box>
            <Box>
              <Paper>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Информация
                  </Typography>
                  
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={user?.user?.email || 'Не указан'}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Paper>
            </Box>
          </Stack>
        </Grid>
        <Grid size={9}>
          <Box>
            <Box spacing={3}>
              <Grid container spacing={3}>
                <Grid item size={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="h4" fontWeight="bold">
                      {personalDictionary.length}
                    </Typography>
                    <Typography variant="body1">
                      слов в словаре
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item size={3}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
                    <Typography variant="h4" fontWeight="bold">
                      0
                    </Typography>
                    <Typography variant="body1">
                      изучено сегодня
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <BookIcon sx={{ mr: 1 }} />
                    Мой словарь
                  </Typography>
                  
                  <Chip 
                    label={`${personalDictionary.length} слов`} 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Divider/>

                {personalDictionary.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <BookIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Словарь пуст
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Начните добавлять слова для изучения
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ width: '100%' }}>
                    {personalDictionary.slice(0, 10).map((entry, index) => (
                      <ListItem key={entry.id} divider={index < personalDictionary.slice(0, 10).length - 1}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="h6" component="span">
                                {entry.word.simplified}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" component="span">
                                ({entry.word.traditional})
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" component="div">
                                <strong>Пиньинь:</strong> {entry.word.pinyin}
                              </Typography>
                              <Typography variant="body2" component="div">
                                <strong>Перевод:</strong> {entry.word.translation}
                              </Typography>
                              {entry.notes && (
                                <Typography variant="body2" component="div">
                                  <strong>Заметки:</strong> {entry.notes}
                                </Typography>
                              )}
                              <Typography variant="caption" color="text.secondary">
                                Добавлено: {formatDate(entry.added_date)}
                              </Typography>
                            </Box>
                          }
                          sx={{ width: '100%' }}
                        />
                      </ListItem>
                    ))}
                    
                    {personalDictionary.length > 10 && (
                      <ListItem>
                        <Typography variant="body2" color="primary" textAlign="center" width="100%">
                          И еще {personalDictionary.length - 10} слов...
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const ProfilePageWithProtection = () => (
    <ProtectedRoute>
        <ProfilePage />
    </ProtectedRoute>
);

export default ProfilePageWithProtection;