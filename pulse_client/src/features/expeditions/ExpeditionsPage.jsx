import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';
import { expeditionsData } from '../../data/expeditionsData';

export default function ExpeditionsPage() {
  const containerRef = useRef(null);
  
  // Track scroll progress exclusively within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to the Y position of the traveling penguin marker
  const markerY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <PageShell 
      title="India's polar journey" 
      terracottaWord="journey"
      subtitle="From the first landing in 1981 to modern year-round research stations."
      heroCrop="right 60%" 
    >
      <div className="max-w-5xl mx-auto px-6 pb-32 w-full mt-12">
        
        <div ref={containerRef} className="relative pt-8 pb-16">
          
          {/* 
            The Winding Hand-drawn Path 
            We use the wobble-edge SVG filter to make a straight line look hand-drawn and organic.
            pathLength is mapped to scroll progress to draw it dynamically.
          */}
          <svg 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-8 md:-ml-4 h-full overflow-visible wobble-edge z-0" 
            preserveAspectRatio="none"
          >
            <motion.line 
              x1="50%" y1="0" x2="50%" y2="100%" 
              stroke="#1B1A17" 
              strokeWidth="2" 
              strokeDasharray="12 12"
              strokeLinecap="round"
              strokeOpacity="0.25"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* Traveling Penguin Marker */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-8 h-8 -ml-4 z-20 flex items-center justify-center text-terracotta bg-paper rounded-full"
            style={{ y: markerY }}
          >
            <Doodle type="penguin" className="w-5 h-5 bg-paper" stroke="currentColor" />
          </motion.div>

          {/* Timeline Entries */}
          <div className="flex flex-col gap-20 md:gap-32 relative z-10">
            {expeditionsData.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className={`flex flex-col md:flex-row w-full items-start pl-16 md:pl-0 ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  <div className={`w-full md:w-[45%] flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                    
                    {/* Stamped Label */}
                    <div className={`mb-4 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className={`font-typewriter text-sm text-ink bg-mustard/20 border border-mustard/40 px-3 py-1 shadow-sm inline-block ${isEven ? 'rotate-[-2deg]' : 'rotate-[3deg]'}`}>
                        {exp.year}
                      </span>
                    </div>

                    <h3 className="font-grotesque text-2xl md:text-3xl text-ink mb-3 text-balance">
                      {exp.title}
                    </h3>
                    
                    <p className="font-body text-ink/75 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <div className={`flex items-center gap-4 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                      <Doodle type={exp.doodle} className="w-8 h-8 text-teal-ink" stroke="currentColor" fill="#23414A15" />
                      <a href="#" className="font-body font-medium text-teal-ink hover:text-terracotta flex items-center gap-2 transition-colors group">
                        <span className={`relative ${isEven ? 'md:order-2' : ''}`}>
                          {exp.linkText}
                          <svg className="absolute -bottom-1 left-0 w-full h-1 text-teal-ink/30 group-hover:text-terracotta/60 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 8 100 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span className={`group-hover:translate-x-1 transition-transform ${isEven ? 'md:order-1 md:rotate-180 md:group-hover:-translate-x-1 md:group-hover:translate-x-0' : ''}`}>
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        <div className="mt-16 text-center">
          <span className="font-hand text-ink/40 text-xl border-b border-ink/10 pb-1">to be continued...</span>
        </div>

      </div>
    </PageShell>
  );
}