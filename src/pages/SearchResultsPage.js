import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Container,
  InputBase,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { authAPI } from '../api';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await authAPI.get(`/api/dictionary/words/search/?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Ошибка при выполнении поиска. Проверьте подключение к интернету и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  if (!query) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">
          Введите поисковый запрос для начала поиска
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              maxWidth: '90%'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Введите слово на китайском или пиньине..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{ 'aria-label': 'поиск слов' }}
            />
            <IconButton 
              type="submit" 
              sx={{ p: '10px' }} 
              aria-label="search"
              disabled={!searchInput.trim()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            maxWidth: '90%'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Введите слово на китайском или пиньине..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            inputProps={{ 'aria-label': 'поиск слов' }}
          />
          <IconButton 
            type="submit" 
            sx={{ p: '10px' }} 
            aria-label="search"
            disabled={!searchInput.trim()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Typography variant="h4" gutterBottom>
        Результаты поиска
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        По запросу: "{query}"
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && results.length === 0 && query && (
        <Alert severity="info" sx={{ my: 2 }}>
          По вашему запросу ничего не найдено
        </Alert>
      )}

      {!loading && results.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="результаты поиска">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                  Китайский
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                  Традиционный
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                  Пиньинь
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>
                  Перевод
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((word) => (
                <TableRow
                  key={word.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="h6" sx={{ fontFamily: 'sans-serif' }}>
                      {word.simplified}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {word.traditional !== word.simplified && (
                      <Typography sx={{ fontFamily: 'sans-serif' }}>
                        {word.traditional}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={word.pinyin} 
                      variant="outlined"
                      sx={{ fontStyle: 'italic' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {word.translation}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && results.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Найдено результатов: {results.length}
        </Typography>
      )}
    </Container>
  );
}

export default SearchResultsPage;