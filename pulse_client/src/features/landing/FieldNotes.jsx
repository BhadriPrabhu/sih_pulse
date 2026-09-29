import { motion } from 'framer-motion';
import Doodle from '../../components/ui/Doodle';

export default function FieldNotes() {
    return (
        <section className="py-14 max-w-5xl mx-auto px-6 relative flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Top Divider */}
            <div className="absolute top-0 left-0 w-full h-8 text-ink/25 overflow-hidden">
                <Doodle type="wavyDivider" className="w-[200%] h-full opacity-50" />
            </div>

            {/* Left side: Balance elements */}
            <div className="hidden md:flex flex-1 items-center justify-center opacity-40 transform -rotate-12">
                <Doodle type="footprints" fill="#1B1A17" className="w-32 h-32" />
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="w-full md:w-[500px] transform rotate-1"
            >
                <div
                    className="bg-[#F8F5EE] shadow-[0_12px_24px_rgba(27,26,23,0.08)] overflow-hidden relative"
                    style={{
                        clipPath: "polygon(8px 0, 100% 0, 100% 95%, 98% 100%, 95% 96%, 92% 100%, 88% 97%, 85% 100%, 82% 96%, 78% 100%, 75% 97%, 72% 100%, 68% 96%, 65% 100%, 62% 97%, 58% 100%, 55% 96%, 52% 100%, 48% 97%, 45% 100%, 42% 96%, 38% 100%, 35% 97%, 32% 100%, 28% 96%, 25% 100%, 22% 97%, 18% 100%, 15% 96%, 12% 100%, 8% 97%, 5% 100%, 2% 96%, 0 100%, 4px 50%)"
                    }}
                >
                    {/* Spiral binding holes simulation */}
                    <div className="absolute top-0 left-0 w-full h-6 bg-[#EBE5D6] flex gap-4 px-4 items-center border-b border-ink/5 z-10">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-ink/10 shadow-inner" />
                        ))}
                    </div>

                    <div className="pt-10 pb-12 px-8 notebook-lines min-h-[160px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-typewriter text-terracotta text-lg">Live update</span>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta"></span>
                            </span>
                        </div>
                        <p className="font-typewriter text-ink/80 leading-relaxed text-sm">
                            Bharati station, today:<br />
                            -42°C, wind 28 km/h, clear sky.<br />
                            Aurora likely tonight. All outdoor fieldwork suspended until 1400 hrs.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}