import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      onClose();
      // Очищаем форму после успешной регистрации
      setFormData({
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      });
      // Предлагаем войти
      onSwitchToLogin();
    } else {
      setError(result.error.detail || 
        result.error.username?.[0] || 
        result.error.email?.[0] || 
        result.error.password?.[0] || 
        'Ошибка регистрации');
    }
    
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" align="center" fontWeight="bold">
          Создать аккаунт
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            
            <TextField
              label="Пароль"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              label="Подтверждение пароля"
              name="password_confirm"
              type={showPassword ? 'text' : 'password'}
              value={formData.password_confirm}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Уже есть аккаунт?{' '}
            <Button 
              variant="text" 
              onClick={onSwitchToLogin}
              sx={{ textTransform: 'none' }}
            >
              Войти
            </Button>
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={onClose} 
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Отмена
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ px: 4 }}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterModal;