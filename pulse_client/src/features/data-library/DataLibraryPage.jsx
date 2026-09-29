import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';
import { libraryData } from '../../data/libraryData';
import { useDebounce } from '../../hooks/useDebounce';
import { useSavedItems } from '../../hooks/useSavedItems';

function HandCheckbox({ label, checked, onChange }) {
  return (
    <div onClick={onChange} className="flex items-center gap-3 cursor-pointer group mb-3">
      <div className="relative w-[18px] h-[18px] flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 text-ink/30 group-hover:text-ink/60 transition-colors">
          <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" rx="1" className="-rotate-2 origin-center" />
        </svg>
        <AnimatePresence>
          {checked && (
            <motion.svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 text-terracotta z-10">
              <motion.path 
                d="M6 12 L10 16 L18 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <span className={`font-body text-sm transition-colors ${checked ? 'text-ink font-medium' : 'text-ink/75'}`}>
        {label}
      </span>
    </div>
  );
}

function LedgerRow({ item, index, expanded, onToggle, isSaved, onSave, onToast }) {
  const isOdd = index % 2 !== 0;

  const handleCopyCitation = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.citation);
    onToast("Citation copied to clipboard");
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    onToast(`Downloading ${item.id}.csv...`);
    
    // Generate a plausible CSV sample based on the dataset
    let csvContent = "Timestamp,Latitude,Longitude,Observation_Value,Unit\n";
    let baseVal = Math.random() * 50 - 20;
    for(let i = 1; i <= 15; i++) {
      const time = `2024-03-${String(i).padStart(2, '0')}T12:00:00Z`;
      const val = (baseVal + (Math.random() * 5 - 2.5)).toFixed(3);
      csvContent += `${time},-69.407,76.187,${val},standard_units\n`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.id.toLowerCase()}_sample.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`border-b border-ink/10 transition-colors ${isOdd ? 'bg-[#EAE4D4]/30 rotate-[0.15deg]' : 'bg-transparent -rotate-[0.1deg]'} ${expanded ? '!bg-paper-lighter' : 'hover:bg-paper-lighter/50'}`}>
      <div onClick={onToggle} className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer gap-4 md:gap-8">
        <div className="flex-grow flex items-start gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onSave(item.id); }}
            className="mt-1 text-ink/30 hover:text-terracotta transition-colors group"
            title="Save to My desk"
          >
            <Doodle type="bookmark" className="w-5 h-5" fill={isSaved ? "#B5502D" : "none"} stroke={isSaved ? "#B5502D" : "currentColor"} />
          </button>
          
          <div>
            <div className="mb-1.5 inline-block">
              <span className="relative font-body text-[13px] text-ink/75">
                {item.type}
                <svg className="absolute -bottom-1 left-0 w-full h-1 text-ink/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <h4 className={`font-grotesque text-lg transition-colors ${expanded ? 'text-terracotta' : 'text-ink'}`}>
              {item.title}
            </h4>
          </div>
        </div>
        
        <div className="flex items-center gap-6 md:gap-12 text-sm font-body text-ink/70 pl-8 md:pl-0">
          <div className="hidden md:block w-24">{item.station}</div>
          <div className="font-typewriter text-ink w-12">{item.year}</div>
          <div className="hidden sm:block w-16">{item.size}</div>
          <button onClick={handleDownload} className="relative group text-teal-ink hover:text-terracotta transition-colors font-medium">
            Download
            <svg className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity text-terracotta/60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 pb-8 flex flex-col md:flex-row gap-8 items-start border-t border-ink/5 mx-4 border-dashed">
              <div className="flex-grow max-w-2xl">
                <p className="font-body text-ink/80 text-[15px] leading-relaxed mb-6">{item.abstract}</p>
                <div className="space-y-3">
                  <p className="font-body text-sm text-ink/60">
                    <span className="font-medium text-ink/80">License:</span> {item.license}
                  </p>
                  <div className="font-body text-sm text-ink/60 flex flex-wrap gap-2 items-center">
                    <span className="font-medium text-ink/80">Citation:</span> {item.citation}
                    <button onClick={handleCopyCitation} className="text-teal-ink hover:text-terracotta underline decoration-teal-ink/30 hover:decoration-terracotta/50 underline-offset-4 ml-2">
                      Copy citation
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48 h-24 shrink-0 relative bg-[#F4F1E9] border border-ink/5 p-2 flex flex-col justify-end transform rotate-1">
                <p className="font-typewriter text-[9px] text-ink/50 absolute top-2 left-2">Data signature</p>
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible pb-2 pt-6">
                  <motion.polyline points={item.chartPoints} fill="none" stroke="#23414A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeOut" }} />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#1B1A17" strokeOpacity="0.05" strokeWidth="1" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#1B1A17" strokeOpacity="0.05" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DataLibraryPage() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  
  // States for filtering and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortOption, setSortOption] = useState("year"); // 'year', 'name', 'size'
  const [yearRange, setYearRange] = useState(1981);
  
  const [regions, setRegions] = useState({ Antarctica: true, Arctic: true, Himalaya: true });
  const [types, setTypes] = useState({ "Ice cores": true, "Weather": true, "Ocean": true, "Biology": true, "Papers": true });

  const { savedItems, toggleItem } = useSavedItems('pulse_saved_datasets');

  const toggleRegion = (k) => setRegions(p => ({ ...p, [k]: !p[k] }));
  const toggleType = (k) => setTypes(p => ({ ...p, [k]: !p[k] }));

  const handleToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Filter and Sort Logic
  const processedData = useMemo(() => {
    let result = libraryData.filter(item => {
      // 1. Search match
      const q = debouncedSearch.toLowerCase();
      const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.station.toLowerCase().includes(q) || item.abstract.toLowerCase().includes(q);
      
      // 2. Region & Type match
      const matchesRegion = regions[item.region];
      const matchesType = types[item.type];
      
      // 3. Year match
      const matchesYear = parseInt(item.year) >= yearRange;

      return matchesSearch && matchesRegion && matchesType && matchesYear;
    });

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'year') return parseInt(b.year) - parseInt(a.year);
      if (sortOption === 'name') return a.title.localeCompare(b.title);
      if (sortOption === 'size') {
        const parseSize = (s) => s.includes('GB') ? parseFloat(s) * 1024 : parseFloat(s);
        return parseSize(b.size) - parseSize(a.size);
      }
      return 0;
    });

    return result;
  }, [debouncedSearch, regions, types, yearRange, sortOption]);

  return (
    <PageShell title="Data library" terracottaWord="library" subtitle="Search 10,000+ open datasets, publications and raw logs from the field." heroCrop="left 70%">
      <div className="max-w-7xl mx-auto px-6 pb-32 w-full flex flex-col md:flex-row gap-12 items-start mt-4">
        
        <button className="md:hidden w-full font-typewriter text-ink/80 py-3 border border-ink/20 rounded-md bg-paper-lighter shadow-sm" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
          {mobileFilterOpen ? "Close filters" : "Filter datasets +"}
        </button>

        {/* Filter Column */}
        <div className={`w-full md:w-64 shrink-0 bg-[#FBF9F4] p-6 shadow-paper-soft border border-ink/5 rounded-xl md:sticky md:top-32 transition-all ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="absolute -top-4 -right-4 rotate-12">
             <span className="font-hand text-terracotta text-lg bg-paper-lighter px-2 py-0.5 shadow-sm border border-terracotta/20 rounded-sm">Refine search</span>
          </div>
          
          <div className="mb-8 relative">
            <input 
              type="text" 
              placeholder="Search by keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-typewriter border-b-2 border-ink/10 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors"
            />
          </div>

          <div className="mb-8">
            <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Region</h4>
            {Object.keys(regions).map(r => <HandCheckbox key={r} label={r} checked={regions[r]} onChange={() => toggleRegion(r)} />)}
          </div>
          
          <div className="mb-8">
            <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Data type</h4>
            {Object.keys(types).map(t => <HandCheckbox key={t} label={t} checked={types[t]} onChange={() => toggleType(t)} />)}
          </div>
          
          <div>
            <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Year (From)</h4>
            <div className="relative pt-4 pb-2">
              <input 
                type="range" min="1981" max="2024" 
                value={yearRange} 
                onChange={(e) => setYearRange(parseInt(e.target.value))}
                className="w-full accent-terracotta appearance-none h-1 bg-ink/10 rounded-full outline-none cursor-pointer" 
              />
              <div className="flex justify-between font-typewriter text-[11px] text-ink/60 mt-2">
                <span>1981</span>
                <span><span className="text-terracotta font-bold text-sm">{yearRange}</span></span>
                <span>2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger List */}
        <div className="w-full flex-grow flex flex-col">
          
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
            <div className="font-hand text-xl text-ink">
              Found <motion.span key={processedData.length} initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="inline-block text-terracotta">{processedData.length}</motion.span> datasets
            </div>
            
            <div className="flex items-center gap-4 font-body text-sm text-ink/60">
              <span>Sort by:</span>
              {['year', 'name', 'size'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => setSortOption(opt)}
                  className={`hover:text-ink transition-colors ${sortOption === opt ? 'text-ink font-medium border-b border-ink' : ''}`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center justify-between px-4 pb-3 border-b-2 border-ink text-[13px] font-typewriter text-ink/70 hidden md:flex pl-12">
            <div className="flex-grow">Dataset title</div>
            <div className="flex items-center gap-12 w-[340px]">
              <div className="w-24">Station</div>
              <div className="w-12">Year</div>
              <div className="w-16">Size</div>
              <div className="w-16"></div>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex flex-col border-b border-ink/10 min-h-[400px]">
            <AnimatePresence>
              {processedData.length === 0 ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="font-typewriter text-lg text-ink/50 mb-2">Hmm, no datasets found matching that criteria.</p>
                  <p className="font-hand text-xl text-ink/40">try broadening the search or adjusting the year slider</p>
                </motion.div>
              ) : (
                processedData.map((item, i) => (
                  <LedgerRow 
                    key={item.id} 
                    item={item} 
                    index={i} 
                    expanded={expandedRow === item.id} 
                    onToggle={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                    isSaved={savedItems.includes(item.id)}
                    onSave={toggleItem}
                    onToast={handleToast}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
          
          {processedData.length > 0 && (
            <div className="mt-8 text-center"><span className="font-hand text-ink/40 text-xl border-b border-ink/10 pb-1">end of results</span></div>
          )}
        </div>
      </div>

      {/* Global Paper Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#FBF9F4] border border-ink/10 shadow-paper-lift px-6 py-3 rounded-md flex items-center gap-3 transform rotate-[-1deg]"
          >
            <span className="font-typewriter text-sm text-ink">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </PageShell>
  );
}