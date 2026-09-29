import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import { useAuth } from '../../context/AuthContext';
import { libraryData } from '../../data/libraryData';
import { mediaData } from '../../data/mediaData';
import { calendarEvents } from '../../data/learnData';

export default function MyDeskPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [savedDatasets, setSavedDatasets] = useState([]);
  const [savedMedia, setSavedMedia] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [bookedTalks, setBookedTalks] = useState([]);

  // Route Protection
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Load saved items
  useEffect(() => {
    const ds = JSON.parse(localStorage.getItem('pulse_saved_datasets') || '[]');
    const med = JSON.parse(localStorage.getItem('pulse_saved_media') || '[]');
    const searches = JSON.parse(localStorage.getItem('pulse_recent_searches') || '[]');
    const talks = JSON.parse(localStorage.getItem('pulse_saved_talks') || '[]');
    
    setSavedDatasets(libraryData.filter(d => ds.includes(d.id)));
    setSavedMedia(mediaData.filter(m => med.includes(m.id)));
    setRecentSearches(searches);
    setBookedTalks(calendarEvents.filter(e => talks.includes(e.date)));
  }, []);

  if (loading || !user) return null;

  return (
    <PageShell title={`${user.name.split(' ')[0]}'s desk`} terracottaWord="desk" subtitle="Your personal collection of saved research, media, and upcoming events." heroCrop="center 60%">
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full mt-8">
        
        {savedDatasets.length === 0 && savedMedia.length === 0 && bookedTalks.length === 0 && recentSearches.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <p className="font-typewriter text-lg text-ink/50 mb-4">Your desk is completely clear.</p>
            <Link to="/explore" className="font-hand text-xl text-teal-ink hover:text-terracotta border-b border-teal-ink/30 pb-1">go find something interesting →</Link>
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-x-12 gap-y-16 relative mt-12">
            
            {/* Booked Talks (Pinned Calendar Slips) */}
            {bookedTalks.map((talk, i) => (
              <PaperCard key={`talk-${i}`} rotation={i % 2 === 0 ? -3 : 2} className="w-56 p-4 !bg-[#F4F1E9] border-t-4 border-sage relative shadow-sm">
                <p className="font-typewriter text-xs text-sage mb-2">Booked Talk</p>
                <h4 className="font-body font-medium text-ink leading-tight mb-1">{talk.title}</h4>
                <p className="font-typewriter text-[10px] text-ink/60">Oct {talk.date}, 2026</p>
              </PaperCard>
            ))}

            {/* Recent Searches (Loose Slips) */}
            {recentSearches.map((search, i) => (
              <div key={`search-${i}`} className="w-48 p-3 bg-white shadow-sm border border-ink/5" style={{ transform: `rotate(${i % 2 === 0 ? 4 : -2}deg)` }}>
                <p className="font-typewriter text-[10px] text-ink/40 mb-1">Recent search</p>
                <p className="font-hand text-ink text-lg leading-tight">{search}</p>
              </div>
            ))}

            {/* Saved Datasets */}
            {savedDatasets.map((item, i) => (
              <PaperCard key={`ds-${item.id}`} rotation={i % 2 === 0 ? -1.5 : 3} className="w-64 min-h-[160px] p-5 !bg-[#F8F5EE] relative shadow-sm">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#EBE5D6] rounded-full shadow-inner opacity-60" />
                <p className="font-typewriter text-sm text-ink/60 mb-2 mt-2">Dataset // {item.type}</p>
                <p className="font-body font-medium text-ink leading-snug mb-4">{item.title}</p>
              </PaperCard>
            ))}

            {/* Saved Media (Polaroids) */}
            {savedMedia.map((item, i) => (
              <PaperCard key={`media-${item.id}`} rotation={i % 2 === 0 ? 2 : -3.5} className="w-48 p-2 pb-6 !bg-white">
                <div className="w-full h-32 bg-glacier/30 relative overflow-hidden border border-ink/5 flex items-center justify-center">
                   <p className="font-typewriter text-ink/40 text-[10px]">[{item.category}]</p>
                </div>
                <p className="font-typewriter text-[10px] text-ink/70 mt-2 ml-1 text-center">{item.caption}</p>
              </PaperCard>
            ))}

          </div>
        )}
      </div>
    </PageShell>
  );
}