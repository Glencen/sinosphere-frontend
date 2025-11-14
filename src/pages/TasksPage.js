import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const levels = [
  { label: 'Базовый', path: '/tasks/basetest' },
  { label: 'Средний', path: '/tasks/midtest' },
  { label: 'Продвинутый', path: '/tasks/hardtest' },
];

const TasksPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, textAlign: 'center' }}>
      <Typography variant="h4" mb={4}>
        Выберите уровень сложности
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {levels.map((level) => (
          <Grid item xs={12} sm={4} key={level.label}>
            <Paper sx={{ p: 4, cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate(level.path)}>
              <Typography variant="h5" mb={2}>
                {level.label} уровень
              </Typography>
              <Button variant="contained" onClick={() => navigate(level.path)}>
                Начать
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TasksPage;
