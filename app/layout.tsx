import './globals.css';
import { StoryProvider } from './contexts/StoryContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Remove metadata export entirely to avoid any issues
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Story Research App</title>
        <meta name="description" content="Interactive storytelling research application" />
      </head>
      <body className={inter.className}>
        <StoryProvider>
          {children}
        </StoryProvider>
      </body>
    </html>
  );
} 