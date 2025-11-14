import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import SearchResultsPage from './pages/SearchResultsPage';
import TasksPage from './pages/TasksPage';
import BaseDifTaskPage from './pages/BaseDifTaskPage';
import MidDifTaskPage from './pages/MidDifTaskPage';
import HardDifTaskPage from './pages/HardDifTaskPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/basetest" element={<BaseDifTaskPage />} />
          <Route path="/tasks/midtest" element={<MidDifTaskPage />} />
          <Route path="/tasks/hardtest" element={<HardDifTaskPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
