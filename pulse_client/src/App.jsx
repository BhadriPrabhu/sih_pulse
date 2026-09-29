import { BrowserRouter } from 'react-router-dom';
import PaperTexture from './components/ui/PaperTexture';
import Navbar from './components/layout/Navbar';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col">
          <PaperTexture />
          <Navbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}