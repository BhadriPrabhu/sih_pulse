import PaperTexture from './components/ui/PaperTexture';
import Navbar from './components/layout/Navbar';
import Hero from './features/landing/Hero';
import Pillars from './features/landing/Pillars';
import FieldNotes from './features/landing/FieldNotes';
import Footer from './features/landing/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <PaperTexture />
      <Navbar />
      
      <main>
        <Hero />
        <Pillars />
        <FieldNotes />
      </main>

      <Footer />
    </div>
  );
}