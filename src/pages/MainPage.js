import { Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';

function MainPage() {
    return (
        <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Добро пожаловать в Sinosphere
            </Typography>
            <Typography variant="h5" color="text.secondary">
                Изучайте китайский язык с помощью умного словаря
            </Typography>
            <SearchBar/>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    Ищите слова на китайском (упрощенном или традиционном), пиньине
                </Typography>
            </Box>
        </Box>
    );
}

export default MainPage;