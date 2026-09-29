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
          <div className="mt-8 flex items-end gap-2 text-ink/40 hover:text-ink transition-colors cursor-pointer group">
            <Doodle type="penguin" className="w-8 h-8 origin-bottom group-hover:rotate-12 transition-transform" />
            <span className="font-body font-medium text-sm mb-1">say hi!</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">Explore</h4>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Knowledge Base</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Expedition Logs</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Media Archive</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">Engage</h4>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">For Classrooms</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Citizen Science</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Ask a Researcher</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-grotesque text-ink text-lg mb-2">System</h4>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">About SIH26063</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Open API Docs</a>
          <a href="#" className="font-body text-ink/60 hover:text-terracotta text-sm">Accessibility</a>
        </div>

      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-ink/40 text-xs font-body pt-8 border-t border-ink/5">
        <p>© 2026 Pulse / Polar Science Outreach.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
        </div>
      </div>
    </footer>
  );
}