# Story Research App

A Next.js application for collecting research data through interactive storytelling. This application allows participants to select story elements, generate a story beginning with AI, continue the story, and submit their work for research purposes.

## Features

- **Multi-step Wizard Interface**: Guided 4-step process with progress indicator
- **Story Element Selection**: Choose from categories of story arcs, objects, terrains, and moods
- **AI Story Generation**: Generate story beginnings based on selected elements using Google's Gemini API
- **Story Continuation Editor**: Continue the story with a rich text editor, word count, and auto-save
- **Submission Form**: Review story and submit with participant information

## Tech Stack

- **Next.js 14 with App Router**: Modern React framework with server components
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **React Context**: State management across components
- **Local Storage**: Data persistence (can be replaced with Vercel KV in production)
- **Google Gemini API**: AI story generation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Google AI Studio API key for Gemini

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd story-research-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: The main application code (Next.js App Router)
  - `/components`: Reusable UI components
  - `/contexts`: React context for state management
  - `/lib`: Utility functions and services
  - `/api`: API routes for backend functionality
  - `/data`: Static data and mock data
  - `/wizard`: The 4-step wizard interface

## Deployment

This project is ready for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Set the environment variables
4. Deploy

## For Production Use

For production use, consider the following enhancements:

- Replace local storage with Vercel KV or another database solution
- Add authentication if needed
- Implement comprehensive error handling
- Set up logging and monitoring
- Add analytics to track user engagement

## License

This project is licensed under the MIT License - see the LICENSE file for details.
