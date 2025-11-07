import { Box, Typography } from '@mui/material';

function MainPage() {
    return (
        <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Добро пожаловать в Sinosphere
            </Typography>
            <Typography variant="h5" color="text.secondary">
                Изучайте китайский язык с помощью умного словаря
            </Typography>
        </Box>
    );
}

export default MainPage;