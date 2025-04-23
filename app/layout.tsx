import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoryProvider } from './contexts/StoryContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Story Research App',
  description: 'Interactive storytelling research application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoryProvider>
          {children}
        </StoryProvider>
      </body>
    </html>
  );
} 