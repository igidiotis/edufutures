import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Interactive Story Research App
        </h1>
        <p className="text-xl text-center mb-12">
          Explore storytelling through an interactive research experience
        </p>
        <div className="flex justify-center">
          <Link 
            href="/wizard/step1" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Story
          </Link>
        </div>
      </div>
    </main>
  );
} 