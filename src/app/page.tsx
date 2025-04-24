import { Metadata } from 'next';
import ResearchApp from '../components/ResearchApp';

export const metadata: Metadata = {
  title: 'Imagining Education Futures',
  description: 'Exploring the future of digital education',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <ResearchApp />
    </main>
  );
}
