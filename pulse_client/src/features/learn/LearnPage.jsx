import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import Doodle from '../../components/ui/Doodle';
import { lessonKits, calendarEvents, quizData } from '../../data/learnData';

export default function LearnPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <PageShell 
      title="Bring the poles to your classroom" 
      terracottaWord="classroom"
      subtitle="Interactive labs, real dataset math problems, and live calls with our researchers."
      heroCrop="right 40%" 
    >
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full mt-4 flex flex-col gap-24">
        
        {/* Section A: Lesson Kits as Folders */}
        <section>
          <div className="flex items-center gap-4 mb-16 relative">
            <h2 className="font-grotesque text-3xl text-ink">Ready-to-use kits</h2>
            <div className="absolute -top-6 left-56 hidden md:flex items-center gap-2 text-sage transform rotate-[-6deg]">
              <span className="font-hand text-lg">download & print</span>
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" className="rotate-90">
                <path d="M5 25 Q 15 15 25 5 M 15 5 L 25 5 L 25 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:items-start pl-4">
            {lessonKits.map((kit) => (
              <motion.div
                key={kit.id}
                initial={{ rotate: kit.rotation, y: 20, opacity: 0 }}
                whileInView={{ rotate: kit.rotation, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, y: -10, transition: { type: "spring", stiffness: 100 } }}
                className={`relative w-full md:w-[320px] ${kit.offset} cursor-pointer group`}
              >
                {/* Folder Tab */}
                <div className={`absolute -top-6 left-0 w-1/2 h-8 rounded-t-xl border-t border-l border-r ${kit.border} ${kit.tabColor}`} />
                
                {/* Folder Body */}
                <div className={`relative w-full min-h-[220px] rounded-b-xl rounded-tr-xl border ${kit.border} ${kit.color} p-6 flex flex-col shadow-paper-soft hover:shadow-paper-lift transition-shadow backdrop-blur-sm`}>
                  <p className="font-typewriter text-xs text-ink/60 mb-1">{kit.grade} // {kit.duration}</p>
                  <h3 className="font-grotesque text-2xl text-ink mb-6 mt-2 leading-tight pr-4">
                    {kit.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 border-dashed">
                    <span className="font-body font-medium text-ink/70">Open kit</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section B: Talk to a Scientist */}
        <section>
          <PaperCard rotation={0.5} className="w-full flex flex-col md:flex-row items-center gap-12 !p-0 overflow-hidden bg-[#FCF9F1]">
            <div className="flex-1 p-8 md:p-12">
              <h2 className="font-grotesque text-3xl text-ink mb-4">Talk to a scientist</h2>
              <p className="font-body text-ink/75 leading-relaxed mb-8 max-w-md">
                Bring a polar researcher directly into your classroom. We host weekly live satellite calls from Bharati station and Himadri observatory. Ask questions about daily life, wildlife, and working in extreme cold.
              </p>
              <PillButton>Save my seat</PillButton>
            </div>

            {/* Torn Wall Calendar Graphic */}
            <div className="w-full md:w-[400px] bg-paper-deep p-6 relative min-h-[300px] border-l border-ink/5 shrink-0 flex flex-col">
              
              {/* Torn top edge via mask */}
              <div 
                className="absolute top-0 left-0 w-full h-8 bg-paper" 
                style={{
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 L4,5 L10,12 L18,2 L25,10 L30,4 L40,11 L48,3 L55,9 L62,2 L70,10 L75,4 L82,11 L90,2 L95,8 L100,0 L100,100 L0,100 Z' fill='black'/%3E%3C/svg%3E")`,
                  maskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 L4,5 L10,12 L18,2 L25,10 L30,4 L40,11 L48,3 L55,9 L62,2 L70,10 L75,4 L82,11 L90,2 L95,8 L100,0 L100,100 L0,100 Z' fill='black'/%3E%3C/svg%3E")`,
                  WebkitMaskSize: "100px 100%",
                  maskSize: "100px 100%"
                }}
              />
              
              {/* Binding holes */}
              <div className="absolute top-4 left-0 w-full flex justify-center gap-6 z-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-[#D4CAB5] rounded-full shadow-inner border-b border-white/40" />
                ))}
              </div>

              <div className="bg-white flex-grow mt-10 rounded-sm shadow-sm p-4 relative flex flex-col">
                <h4 className="font-typewriter text-terracotta text-center border-b border-ink/10 pb-2 mb-2">OCTOBER 2026</h4>
                <div className="grid grid-cols-7 gap-1 flex-grow font-typewriter text-[10px] text-ink/40 text-right">
                  {/* Calendar Days Simulation */}
                  {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center font-bold pb-1 text-ink/60">{d}</div>)}
                  {[...Array(31)].map((_, i) => {
                    const day = (i + 1).toString();
                    const event = calendarEvents.find(e => e.date === day);
                    return (
                      <div key={i} className={`relative pt-1 pr-1 border border-ink/5 ${event ? 'bg-mustard/10' : ''}`}>
                        {day}
                        {event && (
                          <div className="absolute top-4 left-0 right-0 p-0.5 text-left transform -rotate-2">
                            <span className="font-hand text-xs text-ink bg-mustard/30 leading-none px-1 rounded-sm shadow-sm">{event.event}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </PaperCard>
        </section>

        {/* Section C: Typewriter Quiz Teaser */}
        <section className="flex justify-center pt-8">
          <div className="w-full max-w-xl text-center flex flex-col items-center">
            <h2 className="font-typewriter text-xl text-ink mb-8 relative">
              <span className="text-terracotta">?</span> {quizData.question}
            </h2>
            
            <div className="flex flex-col items-center gap-5 w-full pl-4 md:pl-0">
              {quizData.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                
                return (
                  <button 
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className="relative px-6 py-2 font-body text-ink/80 hover:text-ink transition-colors text-left md:text-center group w-fit"
                  >
                    {option}
                    
                    {/* Hand-drawn circle that draws itself when selected */}
                    <AnimatePresence>
                      {isSelected && (
                        <svg className="absolute inset-0 w-[110%] h-[120%] -left-[5%] -top-[10%] text-terracotta pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <motion.path 
                            d="M 50 2 C 80 2, 95 10, 95 20 C 95 30, 80 38, 50 38 C 20 38, 5 30, 5 20 C 5 10, 20 2, 50 2 Z" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </svg>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-hand text-lg text-sage mt-8"
                >
                  {selectedAnswer === quizData.correctAnswer 
                    ? "Exactly! It's brutally cold, but researchers still go outside for measurements." 
                    : "Not quite! It's actually much colder down there. Try again!"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </PageShell>
  );
}