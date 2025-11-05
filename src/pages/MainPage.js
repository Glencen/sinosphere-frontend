import { AuthProvider } from '../contexts/AuthContext'
import Navbar from '../components/Navbar';

function MainPage() {
    return (
        <AuthProvider>
            <Navbar/>
        </AuthProvider>
    );
}

export default MainPage;