import { Link } from 'react-router-dom';
import PageShell from '../../components/layout/PageShell';
import Doodle from '../../components/ui/Doodle';

export default function NotFoundPage() {
  return (
    <PageShell 
      title="This page melted" 
      terracottaWord="melted" 
      subtitle="Looks like the link you followed was lost in the blizzard." 
      heroCrop="right 80%"
    >
      <div className="max-w-2xl mx-auto px-6 pb-32 w-full text-center flex flex-col items-center mt-16">
        <div className="bg-glacier/20 p-8 rounded-full mb-8 transform rotate-3 border border-glacier/30">
          <Doodle type="iceCore" className="w-20 h-20 text-glacier" fill="currentColor" />
        </div>
        <p className="font-typewriter text-ink/70 text-lg mb-10">
          Error 404: The coordinates you entered do not match any known station.
        </p>
        <Link 
          to="/explore" 
          className="font-hand text-2xl text-teal-ink border-b border-teal-ink/30 hover:border-teal-ink pb-1 transition-colors"
        >
          return to the research desk →
        </Link>
      </div>
    </PageShell>
  );
}