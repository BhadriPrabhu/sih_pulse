import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Paperclip } from 'lucide-react';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';
import { getSearchContext, runFallbackSearch } from '../../data/searchHelper';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { libraryData } from '../../data/libraryData';
import { mediaData } from '../../data/mediaData';
import { lessonKits } from '../../data/learnData';

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  
  const [prompt, setPrompt] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState(null);
  
  const { searches, addSearch } = useRecentSearches();
  const searchRecorded = useRef(false);

  useEffect(() => {
    setPrompt(initialQuery);
    
    if (!initialQuery) {
      setResults({ answer: "What would you like to know? Enter a topic above to search the polar archives.", keyTerms: [], datasetIds: [], mediaIds: [], kitIds: [] });
      setIsSearching(false);
      searchRecorded.current = false;
      return;
    }

    if (!searchRecorded.current) {
      addSearch(initialQuery);
      searchRecorded.current = true;
    }

    setIsSearching(true);
    const controller = new AbortController();
    let cancelled = false;

    const executeSearch = async () => {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s client timeout
        
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: initialQuery, context: getSearchContext() }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const textStr = await res.text();
        
        let data;
        try {
          data = JSON.parse(textStr);
        } catch (err) {
          console.error("Invalid JSON response:", res.status, textStr.substring(0, 200));
          throw new Error("Invalid response format");
        }

        if (!res.ok) {
          console.error("API failed:", res.status, data.attempts || data.error);
          throw new Error("API responded with an error");
        }

        if (!cancelled) {
          setResults({
            answer: String(data.answer || ""),
            keyTerms: Array.isArray(data.keyTerms) ? data.keyTerms.map(String) : [],
            datasetIds: Array.isArray(data.datasetIds) ? data.datasetIds.map(String) : [],
            mediaIds: Array.isArray(data.mediaIds) ? data.mediaIds.map(String) : [],
            kitIds: Array.isArray(data.kitIds) ? data.kitIds.map(String) : [],
            source: data.source,
            model: data.model
          });
        }
      } catch (error) {
        if (!cancelled) {
          console.warn("Using offline fallback due to API error or timeout.");
          const fallback = runFallbackSearch(initialQuery);
          setResults({
            answer: String(fallback.answer || ""),
            keyTerms: Array.isArray(fallback.keyTerms) ? fallback.keyTerms.map(String) : [],
            datasetIds: Array.isArray(fallback.datasetIds) ? fallback.datasetIds.map(String) : [],
            mediaIds: Array.isArray(fallback.mediaIds) ? fallback.mediaIds.map(String) : [],
            kitIds: Array.isArray(fallback.kitIds) ? fallback.kitIds.map(String) : [],
            source: "offline"
          });
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    };

    executeSearch();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [initialQuery, addSearch]);

  const handleRefine = () => {
    if (prompt.trim() !== initialQuery) {
      searchRecorded.current = false;
      navigate(`/explore?q=${encodeURIComponent(prompt)}`);
    }
  };

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const renderHighlightedText = (text, terms = []) => {
    const validTerms = terms.filter(t => t.trim() !== '');
    if (!validTerms.length) return text;
    
    const escapedTerms = validTerms.map(escapeRegExp);
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      validTerms.some(t => t.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="underline decoration-terracotta/40 decoration-2 underline-offset-4">{part}</span>
      ) : part
    );
  };

  if (isSearching) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center relative z-10 px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="text-terracotta">
            <motion.path 
              d="M5 20 Q 20 5 35 25 T 65 15 T 90 25 T 115 10" 
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
          </svg>
          <p className="font-typewriter text-xl text-ink">Digging through the archive...</p>
        </motion.div>
      </div>
    );
  }

  const matchedDatasets = libraryData.filter(d => results?.datasetIds?.includes(String(d.id)));
  const matchedMedia = mediaData.filter(m => results?.mediaIds?.includes(String(m.id)));
  const matchedKits = lessonKits.filter(k => results?.kitIds?.includes(String(k.id)));
  const answerParagraphs = results?.answer?.split(/\n+/).filter(p => p.trim() !== '') || [];
  const isDebug = searchParams.get('debug') === '1';

  return (
    <PageShell title="Your research desk" terracottaWord="desk" subtitle="Here is what I gathered from the latest field reports and climate databases." heroCrop="center 65%">
      <div className="max-w-5xl mx-auto px-6 pb-32 w-full">
        
        {/* Compact Prompt Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="bg-paper-lighter rounded-2xl p-4 shadow-paper-soft wobble-edge border border-ink/10 flex flex-col md:flex-row gap-4 items-center mb-6"
        >
          <div className="flex-grow w-full">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleRefine())}
              placeholder="Ask anything..."
              className="w-full bg-transparent font-typewriter text-ink/80 text-sm md:text-base resize-none focus:outline-none p-2"
              rows={2}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-ink/10 pt-4 md:pt-0 md:pl-4">
            <PillButton onClick={handleRefine} className="whitespace-nowrap px-4 py-1.5 text-sm">Refine search</PillButton>
          </div>
        </motion.div>

        {/* Recent Searches */}
        {searches.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-16 pl-4">
            <span className="font-typewriter text-xs text-ink/40 mt-2">Recent:</span>
            {searches.map((s, i) => (
              <button 
                key={i} 
                onClick={() => { searchRecorded.current = false; navigate(`/explore?q=${encodeURIComponent(s)}`); }}
                className="bg-[#F8F5EE] border border-ink/5 px-3 py-1 font-hand text-ink/70 hover:text-terracotta hover:-translate-y-0.5 transition-all text-sm shadow-sm"
                style={{ clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)', transform: `rotate(${i % 2 === 0 ? -1 : 1.5}deg)` }}
              >
                {s.length > 25 ? s.substring(0, 25) + '...' : s}
              </button>
            ))}
          </div>
        )}

        {/* Scientist's Note */}
        {answerParagraphs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }} className="max-w-3xl mb-20">
            <div className="flex items-start gap-4">
              <Doodle type="iceCore" className="w-10 h-10 text-teal-ink shrink-0 mt-1" fill="#23414A" />
              <div className="flex flex-col">
                {answerParagraphs.map((para, i) => (
                  <p key={i} className="font-body text-ink/80 text-lg leading-relaxed mb-4">
                    {renderHighlightedText(para, results.keyTerms)}
                  </p>
                ))}
                {isDebug && results.source && (
                  <p className="font-typewriter text-[10px] text-ink/40 mt-2 opacity-70 border-t border-ink/5 pt-2">
                    {results.source === 'gemini' ? `Answered by the archive assistant (${results.model})` : 'Answered from the offline archive'}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <h3 className="font-grotesque text-2xl text-ink mb-12">What I found</h3>

        {/* Dynamic Scattered Results Layout */}
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-x-12 gap-y-16 relative">
          
          {matchedDatasets.length === 0 && matchedMedia.length === 0 && matchedKits.length === 0 && (
             <p className="font-hand text-xl text-ink/40">No specific files found, but the note above should help!</p>
          )}

          {matchedDatasets.map((item, i) => (
            <PaperCard key={item.id} rotation={i % 2 === 0 ? -2 : 2.5} className="w-64 min-h-[160px] p-5 !bg-[#F8F5EE] relative !shadow-sm hover:!shadow-md" style={{ clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 2% 98%)' }}>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#EBE5D6] rounded-full shadow-inner opacity-60" />
              <p className="font-typewriter text-sm text-ink/60 mb-2 mt-2">Dataset // {item.type}</p>
              <p className="font-body font-medium text-ink leading-snug mb-4">{item.title}</p>
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-ink/10 border-dashed">
                <span className="font-typewriter text-[10px] text-ink/60">{item.size}</span>
                <span className="font-typewriter text-[10px] text-ink/60">{item.year}</span>
              </div>
            </PaperCard>
          ))}

          {matchedMedia.map((item, i) => (
            <PaperCard key={item.id} rotation={i % 2 === 0 ? 3.5 : -3} className="w-56 p-2 pb-8 !bg-white">
              <div className="w-full h-32 bg-glacier/40 relative overflow-hidden border border-ink/5 flex items-center justify-center">
                 <p className="font-typewriter text-ink/40 text-xs">[{item.category}]</p>
              </div>
              <p className="font-typewriter text-[11px] text-ink/70 mt-3 ml-2 text-center">{item.caption}</p>
            </PaperCard>
          ))}

          {matchedKits.map((item, i) => (
            <PaperCard key={item.id} rotation={-1.5} className={`w-72 min-h-[200px] flex flex-col p-6 ${item.color} border-t-[12px] ${item.border}`}>
              <p className={`font-typewriter text-sm ${item.textColor} mb-2`}>Lesson kit • {item.grade}</p>
              <h4 className="font-grotesque text-xl text-ink mb-2">{item.title}</h4>
              <p className="font-body text-sm text-ink/70 mb-6">{item.duration} activity.</p>
              <span className={`font-hand text-lg ${item.textColor} mt-auto w-fit`}>Open folder →</span>
            </PaperCard>
          ))}

        </div>
      </div>
    </PageShell>
  );
}