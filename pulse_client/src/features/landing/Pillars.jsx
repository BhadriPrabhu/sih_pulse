import PaperCard from '../../components/ui/PaperCard';
import Doodle from '../../components/ui/Doodle';
import { Link } from 'react-router-dom';

export default function Pillars() {
  
  // Moved component definition outside of the JSX return
  const LinkUnderline = ({ text, to }) => (
    <Link to={to} className="font-body font-medium text-lg text-teal-ink hover:text-terracotta flex items-center gap-2 transition-colors w-fit group">
      <span className="relative">
        {text}
        <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-teal-ink/30 group-hover:text-terracotta/60 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  );

  return (
    <section className="relative z-20 py-24 max-w-[1200px] mx-auto px-6">
      
      <div className="mb-10 relative">
        <h2 className="font-grotesque text-4xl md:text-5xl text-ink tracking-tight">Three ways into the ice.</h2>
        <div className="absolute -top-8 left-[340px] hidden md:flex items-center gap-2 text-terracotta transform rotate-6">
          <span className="font-hand text-xl">start anywhere!</span>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="-scale-y-100">
            <path d="M5 25 Q 15 15 25 5 M 15 5 L 25 5 L 25 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:items-start pt-12">
        
        {/* Card 1: Knowledge (Largest) */}
        <PaperCard rotation={-2.5} className="w-full md:w-[480px] z-10 min-h-[420px] flex flex-col">
          <Doodle type="iceCore" fill="#9DB4B8" className="w-8 h-8 mb-6" />
          <h3 className="font-grotesque text-3xl text-ink mb-4">Knowledge repository</h3>
          <p className="font-body text-ink/75 text-lg leading-relaxed mb-8 flex-grow">
            10,000+ datasets, papers and field reports from India's polar missions, searchable in plain language. No jargon required.
          </p>
          <LinkUnderline text="Dive into data" to="/data-library" />
        </PaperCard>

        {/* Card 2: Media (Shifted down, overlaps left) */}
        <PaperCard rotation={1.5} className="w-full md:w-[380px] z-20 md:translate-y-[60px] md:-ml-8 min-h-[340px] flex flex-col mt-12 md:mt-0">
          <Doodle type="camera" fill="#D9A441" className="w-8 h-8 mb-6" />
          <h3 className="font-grotesque text-2xl text-ink mb-3">Media library</h3>
          <p className="font-body text-ink/75 leading-relaxed mb-6">
            Raw footage, aurora timelapses, and expedition photography.
          </p>
          
          {/* Detailed Polaroids */}
          <div className="relative h-28 mb-8 flex-grow">
            {/* Glacier Polaroid */}
            <div className="absolute left-0 top-2 w-20 h-24 bg-[#F8F8F8] border border-ink/5 p-1.5 shadow-sm rotate-[-6deg]">
              <div className="w-full h-[60%] bg-glacier" />
              <p className="font-typewriter text-[9px] text-ink/60 mt-1.5 ml-1">Ice shelf '24</p>
            </div>
            {/* Ship Polaroid */}
            <div className="absolute left-10 top-0 w-20 h-24 bg-[#F8F8F8] border border-ink/5 p-1.5 shadow-sm rotate-[2deg]">
              <div className="w-full h-[60%] bg-terracotta relative overflow-hidden">
                <svg className="absolute bottom-0 w-full h-4 text-ink/20" viewBox="0 0 100 50"><path d="M10 50L30 20H80L90 50Z" fill="currentColor"/></svg>
              </div>
              <p className="font-typewriter text-[9px] text-ink/60 mt-1.5 ml-1">Vessel approach</p>
            </div>
            {/* Aurora Polaroid */}
            <div className="absolute left-20 top-3 w-20 h-24 bg-[#F8F8F8] border border-ink/5 p-1.5 shadow-sm rotate-[7deg]">
              <div className="w-full h-[60%] bg-teal-ink relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-sage/60 rounded-full blur-md transform -translate-y-2 translate-x-2" />
              </div>
              <p className="font-typewriter text-[9px] text-ink/60 mt-1.5 ml-1">Night skies</p>
            </div>
          </div>

          <LinkUnderline text="View gallery" to="/media" />
        </PaperCard>

        {/* Card 3: Education (Shifted up, narrower, overlaps left) */}
        <PaperCard rotation={-1} className="w-full md:w-[320px] z-30 md:-translate-y-[30px] md:-ml-8 min-h-[300px] flex flex-col mt-12 md:mt-0">
          <Doodle type="chalkboard" fill="#7C8A6A" className="w-8 h-8 mb-6" />
          <h3 className="font-grotesque text-2xl text-ink mb-3">Outreach & ed</h3>
          <p className="font-body text-ink/75 leading-relaxed mb-8 flex-grow">
            Lesson kits, virtual lab visits and live talks with scientists, built entirely for classrooms.
          </p>
          <LinkUnderline text="For teachers" to="/learn" />
        </PaperCard>

      </div>
    </section>
  );
}