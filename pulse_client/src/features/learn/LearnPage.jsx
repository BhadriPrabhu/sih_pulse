import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/layout/PageShell';
import PaperCard from '../../components/ui/PaperCard';
import PillButton from '../../components/ui/PillButton';
import { lessonKits, calendarEvents, quizQuestions } from '../../data/learnData';

export default function LearnPage() {
  // Slide-over Kit State
  const [activeKit, setActiveKit] = useState(null);

  // Scientist Talk Booking State
  const [activeDate, setActiveDate] = useState("14");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", role: "Teacher" });
  const [bookingError, setBookingError] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  // Quiz State
  const [quizState, setQuizState] = useState({ currentQ: 0, score: 0, selectedAnswer: null, showExplanation: false, finished: false });
  const [liveQuestions, setLiveQuestions] = useState(quizQuestions);
  const [weatherStatus, setWeatherStatus] = useState("Fetching live note...");

  // Load bookings on mount
  useEffect(() => {
    const stored = localStorage.getItem('pulse_saved_talks');
    if (stored) setBookedDates(JSON.parse(stored));
  }, []);

  // Fetch Live Weather for Q1
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-69.407&longitude=76.187&current_weather=true')
      .then(res => res.json())
      .then(data => {
        const temp = data.current_weather.temperature;
        setWeatherStatus("Live from Open-Meteo");
        setLiveQuestions(prev => {
          const updated = [...prev];
          updated[0] = {
            id: "q1",
            question: "How cold is Bharati station right now?",
            options: [
              "0°C (Unusually warm summer day)",
              `${Math.round(temp)}°C (Live reading from the station)`,
              "-80°C (Deep winter extreme)"
            ],
            correctAnswer: 1,
            explanation: `It is currently ${temp}°C at Bharati station! Researchers check these live readings daily before doing outdoor fieldwork.`
          };
          return updated;
        });
      })
      .catch(() => {
        setWeatherStatus("Offline fallback");
        setLiveQuestions(prev => {
          const updated = [...prev];
          updated[0] = {
            id: "q1",
            question: "How cold is Bharati station today?",
            options: ["0°C (Unusually warm)", "-42°C (Exposed skin freezes)", "-12°C (Like a freezer)"],
            correctAnswer: 1,
            explanation: "It's brutally cold (-42°C in our offline record). Researchers wear specialized extreme cold weather (ECW) gear."
          };
          return updated;
        });
      });
  }, []);

  // Handlers
  const handleDownloadKit = (kit) => {
    const content = `
      <h1>${kit.title}</h1>
      <p><strong>Grade:</strong> ${kit.grade} | <strong>Duration:</strong> ${kit.duration}</p>
      <h2>Outline</h2>
      <ul>${kit.outline.map(o => `<li>${o}</li>`).join('')}</ul>
      <h2>Materials Needed</h2>
      <ul>${kit.materials.map(m => `<li>${m}</li>`).join('')}</ul>
    `;
    const blob = new Blob([content], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${kit.id}-lesson-plan.html`;
    link.click();
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.email.includes("@")) {
      setBookingError("Please provide a valid name and email.");
      return;
    }
    
    const updated = [...bookedDates, activeDate];
    setBookedDates(updated);
    localStorage.setItem('pulse_saved_talks', JSON.stringify(updated));
    
    setIsBooking(false);
    setBookingError("");
    setBookingForm({ name: "", email: "", role: "Teacher" });
  };

  const handleQuizSelect = (index) => {
    if (quizState.showExplanation || quizState.finished) return;
    const isCorrect = index === liveQuestions[quizState.currentQ].correctAnswer;
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: index,
      showExplanation: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleQuizNext = () => {
    if (quizState.currentQ < liveQuestions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQ: prev.currentQ + 1, selectedAnswer: null, showExplanation: false }));
    } else {
      setQuizState(prev => ({ ...prev, finished: true }));
    }
  };

  const activeEvent = calendarEvents.find(e => e.date === activeDate);
  const isCurrentlyBooked = bookedDates.includes(activeDate);
  const currentQ = liveQuestions[quizState.currentQ];

  return (
    <PageShell title="Bring the poles to your classroom" terracottaWord="classroom" subtitle="Interactive labs, real dataset math problems, and live calls with our researchers." heroCrop="85% 60%">
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full mt-4 flex flex-col gap-24 overflow-x-hidden">
        
        {/* Section A: Lesson Kits */}
        <section>
          <div className="flex items-center gap-4 mb-16 relative">
            <h2 className="font-grotesque text-3xl text-ink">Ready-to-use kits</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:items-start pl-4">
            {lessonKits.map((kit) => (
              <motion.div
                key={kit.id}
                initial={{ rotate: kit.rotation, y: 20, opacity: 0 }}
                whileInView={{ rotate: kit.rotation, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, y: -10, transition: { type: "spring", stiffness: 100 } }}
                onClick={() => setActiveKit(kit)}
                className={`relative w-full md:w-[320px] ${kit.offset} cursor-pointer group`}
              >
                <div className={`absolute -top-6 left-0 w-1/2 h-8 rounded-t-xl ${kit.tabColor}`} />
                <div className={`relative w-full min-h-[220px] rounded-b-xl rounded-tr-xl ${kit.color} p-6 flex flex-col shadow-[0_10px_24px_rgba(120,90,50,0.15)] hover:shadow-[0_15px_30px_rgba(120,90,50,0.2)] transition-all`}>
                  <p className="font-typewriter text-xs text-ink/60 mb-1">Class {kit.grade.replace('Classes ', '')} // {kit.duration}</p>
                  <h3 className="font-grotesque text-2xl text-ink mb-6 mt-2 leading-tight pr-4">{kit.title}</h3>
                  <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 border-dashed">
                    <span className="font-body font-medium text-ink/70">Open kit</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Slide-over Kit Viewer */}
        <AnimatePresence>
          {activeKit && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveKit(null)} className="fixed inset-0 bg-ink/30 z-[60]" />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className={`fixed top-0 right-0 w-full md:w-[500px] h-full ${activeKit.color} z-[70] shadow-2xl p-8 md:p-12 overflow-y-auto border-l border-ink/10`}
              >
                <button onClick={() => setActiveKit(null)} className="absolute top-6 right-6 font-typewriter text-ink/60 hover:text-ink">[x] close</button>
                <p className={`font-typewriter text-sm ${activeKit.textColor} mb-2 mt-8`}>Lesson kit • {activeKit.grade}</p>
                <h2 className="font-grotesque text-4xl text-ink mb-8">{activeKit.title}</h2>
                
                <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Lesson outline</h4>
                <ul className="font-body text-ink/80 space-y-3 mb-8 list-disc pl-5">
                  {activeKit.outline.map((o, i) => <li key={i}>{o}</li>)}
                </ul>

                <h4 className="font-typewriter text-ink font-bold mb-4 text-sm border-b border-ink/10 pb-2 border-dashed">Materials needed</h4>
                <ul className="font-body text-ink/80 space-y-2 mb-12 list-none">
                  {activeKit.materials.map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink/30" /> {m}
                    </li>
                  ))}
                </ul>

                <PillButton onClick={() => handleDownloadKit(activeKit)} className="w-full py-4 text-lg">Download printable kit</PillButton>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Section B: Talk to a Scientist */}
        <section>
          <PaperCard rotation={0.5} className="w-full flex flex-col md:flex-row items-start gap-12 !p-0 overflow-hidden bg-[#FCF9F1]">
            <div className="flex-1 p-8 md:p-12 relative min-h-[400px]">
              
              <AnimatePresence mode="wait">
                {!isBooking ? (
                  <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-grotesque text-3xl text-ink mb-4">Talk to a scientist</h2>
                    <p className="font-body text-ink/75 leading-relaxed mb-8 max-w-md">
                      Bring a polar researcher directly into your classroom. We host weekly live satellite calls from Bharati station and Himadri observatory.
                    </p>
                    
                    {activeEvent && (
                      <div className="bg-paper-deep/50 border border-ink/5 p-4 rounded-md mb-8 max-w-sm">
                        <p className="font-typewriter text-xs text-terracotta mb-1">Selected: Oct {activeEvent.date}, 2026</p>
                        <h4 className="font-body font-medium text-ink text-lg">{activeEvent.title}</h4>
                        <p className="font-body text-sm text-ink/60 mt-1">{activeEvent.topic} with {activeEvent.speaker}</p>
                      </div>
                    )}
                    
                    {isCurrentlyBooked ? (
                      <div className="inline-block border-2 border-sage text-sage font-typewriter px-4 py-2 transform -rotate-2">
                        SEAT SAVED
                      </div>
                    ) : (
                      <PillButton onClick={() => setIsBooking(true)}>Save my seat</PillButton>
                    )}
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleBookSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-sm">
                    <h3 className="font-typewriter text-xl text-ink mb-6 border-b border-ink/10 pb-2 border-dashed">Register for Oct {activeDate}</h3>
                    
                    <input type="text" placeholder="Your name" value={bookingForm.name} onChange={e => setBookingForm(p => ({...p, name: e.target.value}))} className="w-full bg-transparent font-typewriter border-b-2 border-ink/10 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors mb-6" />
                    
                    <input type="email" placeholder="Email address" value={bookingForm.email} onChange={e => setBookingForm(p => ({...p, email: e.target.value}))} className="w-full bg-transparent font-typewriter border-b-2 border-ink/10 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors mb-8" />
                    
                    {bookingError && <p className="font-typewriter text-terracotta text-sm mb-4">{bookingError}</p>}
                    
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setIsBooking(false)} className="font-body text-ink/50 hover:text-ink">Cancel</button>
                      <PillButton type="submit">Confirm seat</PillButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>

            {/* Torn Wall Calendar */}
            <div className="w-full md:w-[400px] bg-paper-deep p-6 relative min-h-[400px] border-l border-ink/5 shrink-0 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-8 bg-paper" style={{ WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 L4,5 L10,12 L18,2 L25,10 L30,4 L40,11 L48,3 L55,9 L62,2 L70,10 L75,4 L82,11 L90,2 L95,8 L100,0 L100,100 L0,100 Z' fill='black'/%3E%3C/svg%3E")`, maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 L4,5 L10,12 L18,2 L25,10 L30,4 L40,11 L48,3 L55,9 L62,2 L70,10 L75,4 L82,11 L90,2 L95,8 L100,0 L100,100 L0,100 Z' fill='black'/%3E%3C/svg%3E")`, WebkitMaskSize: "100px 100%", maskSize: "100px 100%" }} />
              <div className="absolute top-4 left-0 w-full flex justify-center gap-6 z-10">
                {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-[#D4CAB5] rounded-full shadow-inner border-b border-white/40" />)}
              </div>

              <div className="bg-white flex-grow mt-10 rounded-sm shadow-sm p-4 relative flex flex-col">
                <h4 className="font-typewriter text-terracotta text-center border-b border-ink/10 pb-2 mb-2">OCTOBER 2026</h4>
                <div className="grid grid-cols-7 gap-1 flex-grow font-typewriter text-[10px] text-ink/40 text-right">
                  {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center font-bold pb-1 text-ink/60">{d}</div>)}
                  {[...Array(31)].map((_, i) => {
                    const day = (i + 1).toString();
                    const event = calendarEvents.find(e => e.date === day);
                    const isBooked = bookedDates.includes(day);
                    
                    return (
                      <div 
                        key={i} 
                        onClick={() => event && setActiveDate(day)}
                        className={`relative pt-1 pr-1 border border-ink/5 transition-colors ${event ? 'bg-mustard/10 cursor-pointer hover:bg-mustard/20' : ''} ${activeDate === day ? 'ring-1 ring-terracotta' : ''}`}
                      >
                        {day}
                        {event && (
                          <div className="absolute top-3 left-0 right-0 p-0.5 text-left transform -rotate-2">
                            <span className={`font-hand text-[10px] leading-tight px-1 rounded-sm shadow-sm block ${isBooked ? 'bg-sage/40 text-ink' : 'bg-mustard/30 text-ink'}`}>
                              {event.title}
                            </span>
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

        {/* Section C: Typewriter Quiz */}
        <section className="flex justify-center pt-8 pb-16">
          <div className="w-full max-w-2xl flex flex-col relative bg-paper-lighter border border-ink/10 shadow-paper-soft p-8 md:p-12 rounded-lg wobble-edge">
            
            <div className="flex justify-between items-center mb-8 border-b border-ink/10 pb-4 border-dashed">
              <span className="font-typewriter text-xs text-ink/50 uppercase tracking-widest">{weatherStatus}</span>
              <span className="font-typewriter text-sm text-terracotta">Score: {quizState.score}/{liveQuestions.length}</span>
            </div>

            <AnimatePresence mode="wait">
              {!quizState.finished ? (
                <motion.div key="q" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
                  <h2 className="font-typewriter text-xl text-ink mb-10 text-balance min-h-[60px]">
                    <span className="text-terracotta">Q{quizState.currentQ + 1}.</span> {currentQ.question}
                  </h2>
                  
                  <div className="flex flex-col items-center gap-4 w-full pl-4 md:pl-0 mb-8">
                    {currentQ.options.map((option, index) => {
                      const isSelected = quizState.selectedAnswer === index;
                      const isCorrect = index === currentQ.correctAnswer;
                      
                      let circleColor = "text-terracotta";
                      if (quizState.showExplanation) {
                        if (isCorrect) circleColor = "text-sage";
                        else if (isSelected) circleColor = "text-terracotta";
                      }

                      return (
                        <button 
                          key={index}
                          onClick={() => handleQuizSelect(index)}
                          disabled={quizState.showExplanation}
                          className={`relative px-6 py-3 font-body transition-colors text-left md:text-center w-fit ${quizState.showExplanation && !isCorrect && !isSelected ? 'text-ink/30' : 'text-ink'}`}
                        >
                          {option}
                          
                          <AnimatePresence>
                            {(isSelected || (quizState.showExplanation && isCorrect)) && (
                              <svg className={`absolute inset-0 w-[110%] h-[120%] -left-[5%] -top-[10%] pointer-events-none ${circleColor}`} viewBox="0 0 100 40" preserveAspectRatio="none">
                                <motion.path 
                                  d="M 50 2 C 80 2, 95 10, 95 20 C 95 30, 80 38, 50 38 C 20 38, 5 30, 5 20 C 5 10, 20 2, 50 2 Z" 
                                  stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"
                                  initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                                />
                              </svg>
                            )}
                          </AnimatePresence>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {quizState.showExplanation && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col items-center w-full">
                        <p className="font-hand text-xl text-ink/80 bg-mustard/10 px-6 py-3 border border-mustard/20 -rotate-1 mb-6">
                          {currentQ.explanation}
                        </p>
                        <PillButton onClick={handleQuizNext}>Next question</PillButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div key="finish" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-12">
                  <h2 className="font-grotesque text-4xl text-ink mb-4">Quiz complete!</h2>
                  <div className="bg-paper border-2 border-ink/10 p-6 transform rotate-2 mb-8 shadow-sm">
                    <p className="font-typewriter text-sm text-ink/50 uppercase tracking-widest mb-2 border-b border-ink/10 pb-2 border-dashed">Your polar score</p>
                    <p className="font-typewriter text-5xl text-terracotta">{quizState.score} <span className="text-xl text-ink/40">/ {liveQuestions.length}</span></p>
                  </div>
                  <button onClick={() => setQuizState({ currentQ: 0, score: 0, selectedAnswer: null, showExplanation: false, finished: false })} className="font-body text-teal-ink hover:text-terracotta underline underline-offset-4 decoration-teal-ink/30">
                    Retake quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </PageShell>
  );
}