import { Link } from 'react-router-dom';
import Doodle from '../../components/ui/Doodle';

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto mt-12">
      {/* Hand-drawn Wavy Divider */}
      <div className="absolute top-0 left-0 w-full h-8 text-ink/25 overflow-hidden">
        <Doodle type="wavyDivider" className="w-[200%] h-full opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
        <div className="md:col-span-1 flex flex-col items-start">
          <span className="font-typewriter text-3xl text-ink mb-4">Pulse.</span>
          <p className="font-body text-ink/60 text-sm max-w-[200px]">
            The poles, closer than you think. An SIH 2026 Initiative.
          </p>
          <button className="mt-8 flex items-end gap-2 text-ink/40 hover:text-ink transition-colors cursor-pointer group outline-none">
            <Doodle type="penguin" className="w-8 h-8 origin-bottom group-hover:rotate-12 transition-transform" />
            <span className="font-body font-medium text-sm mb-1">say hi!</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">Explore</h4>
          <Link to="/data-library" className="font-body text-ink/60 hover:text-terracotta text-sm">Knowledge Base</Link>
          <Link to="/expeditions" className="font-body text-ink/60 hover:text-terracotta text-sm">Expedition Logs</Link>
          <Link to="/media" className="font-body text-ink/60 hover:text-terracotta text-sm">Media Archive</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">Engage</h4>
          <Link to="/learn" className="font-body text-ink/60 hover:text-terracotta text-sm">For Classrooms</Link>
          <Link to="/coming-soon" className="font-body text-ink/60 hover:text-terracotta text-sm">Citizen Science</Link>
          <Link to="/coming-soon" className="font-body text-ink/60 hover:text-terracotta text-sm">Ask a Researcher</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">System</h4>
          <Link to="/coming-soon" className="font-body text-ink/60 hover:text-terracotta text-sm">About SIH26063</Link>
          <Link to="/coming-soon" className="font-body text-ink/60 hover:text-terracotta text-sm">Open API Docs</Link>
          <Link to="/coming-soon" className="font-body text-ink/60 hover:text-terracotta text-sm">Accessibility</Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-ink/40 text-xs font-body pt-8 border-t border-ink/5">
        <p>© 2026 Pulse / Polar Science Outreach.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/coming-soon" className="hover:text-ink">Privacy</Link>
          <Link to="/coming-soon" className="hover:text-ink">Terms</Link>
        </div>
      </div>
    </footer>
  );
}