import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';

export default function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <PageShell 
      title="Still in the field" 
      terracottaWord="field" 
      subtitle="Our researchers are still gathering data for this section." 
      heroCrop="center 70%"
    >
      <div className="max-w-2xl mx-auto px-6 pb-32 w-full text-center flex flex-col items-center mt-16">
        <div className="bg-[#EAE4D4]/50 p-8 rounded-full mb-8 transform -rotate-3 border border-ink/5">
          <Doodle type="tent" className="w-20 h-20 text-teal-ink opacity-80" fill="currentColor" />
        </div>
        <p className="font-typewriter text-ink/70 text-lg mb-10 max-w-md leading-relaxed">
          This page is currently being drafted in the field notebook. Check back after the next expedition!
        </p>
        <button 
          onClick={() => navigate(-1)} 
          className="font-hand text-2xl text-terracotta border-b border-terracotta/30 hover:border-terracotta pb-1 transition-colors"
        >
          ← go back to basecamp
        </button>
      </div>
    </PageShell>
  );
}