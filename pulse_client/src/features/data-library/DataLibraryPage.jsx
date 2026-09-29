import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import { libraryData } from '../../data/libraryData';

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

function LedgerRow({ item, index, expanded, onToggle }) {
  const isOdd = index % 2 !== 0;

  return (
    <div className={`border-b border-ink/10 transition-colors ${isOdd ? 'bg-[#EAE4D4]/30 rotate-[0.15deg]' : 'bg-transparent -rotate-[0.1deg]'} ${expanded ? '!bg-paper-lighter' : 'hover:bg-paper-lighter/50'}`}>
      <div onClick={onToggle} className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer gap-4 md:gap-8">
        <div className="flex-grow">
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
        <div className="flex items-center gap-6 md:gap-12 text-sm font-body text-ink/70">
          <div className="hidden md:block w-24">{item.station}</div>
          <div className="font-typewriter text-ink w-12">{item.year}</div>
          <div className="hidden sm:block w-16">{item.size}</div>
          <div className="relative group text-teal-ink hover:text-terracotta transition-colors font-medium">
            Download
            <svg className="absolute -bottom-1 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity text-terracotta/60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
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
                <div className="space-y-2">
                  <p className="font-body text-xs text-ink/60"><span className="font-medium text-ink/80">License:</span> {item.license}</p>
                  <p className="font-body text-xs text-ink/60"><span className="font-medium text-ink/80">Citation:</span> {item.citation}</p>
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
  const [regions, setRegions] = useState({ Antarctica: true, Arctic: false, Himalaya: false });
  const [types, setTypes] = useState({ "Ice cores": true, "Weather": true, "Ocean": false, "Biology": false, "Papers": false });

  const toggleRegion = (k) => setRegions(p => ({ ...p, [k]: !p[k] }));
  const toggleType = (k) => setTypes(p => ({ ...p, [k]: !p[k] }));

  return (
    <PageShell title="Data library" terracottaWord="library" subtitle="Search 10,000+ open datasets, publications and raw logs from the field." heroCrop="left 70%">
      <div className="max-w-7xl mx-auto px-6 pb-32 w-full flex flex-col md:flex-row gap-12 items-start mt-4">
        <button className="md:hidden w-full font-typewriter text-ink/80 py-3 border border-ink/20 rounded-md bg-paper-lighter shadow-sm" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
          {mobileFilterOpen ? "Close filters" : "Filter datasets +"}
        </button>

        <div className={`w-full md:w-64 shrink-0 bg-[#FBF9F4] p-6 shadow-paper-soft border border-ink/5 rounded-xl md:sticky md:top-32 transition-all ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="absolute -top-4 -right-4 rotate-12">
             <span className="font-hand text-terracotta text-lg bg-paper-lighter px-2 py-0.5 shadow-sm border border-terracotta/20 rounded-sm">Refine search</span>
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
            <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Year range</h4>
            <div className="relative pt-4 pb-2">
              <input type="range" min="1981" max="2024" defaultValue="2010" className="w-full accent-terracotta appearance-none h-1 bg-ink/10 rounded-full outline-none" />
              <div className="flex justify-between font-typewriter text-[11px] text-ink/60 mt-2">
                <span>1981</span>
                <span>2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-grow flex flex-col">
          <div className="flex items-center justify-between px-4 pb-3 border-b-2 border-ink text-[13px] font-typewriter text-ink/70 hidden md:flex">
            <div className="flex-grow">Dataset title</div>
            <div className="flex items-center gap-12 w-[340px]">
              <div className="w-24">Station</div>
              <div className="w-12">Year</div>
              <div className="w-16">Size</div>
              <div className="w-16"></div>
            </div>
          </div>
          <div className="flex flex-col border-b border-ink/10">
            {libraryData.map((item, i) => (
              <LedgerRow key={item.id} item={item} index={i} expanded={expandedRow === item.title} onToggle={() => setExpandedRow(expandedRow === item.title ? null : item.title)} />
            ))}
          </div>
          <div className="mt-8 text-center"><span className="font-hand text-ink/40 text-xl border-b border-ink/10 pb-1">end of results</span></div>
        </div>
      </div>
    </PageShell>
  );
}