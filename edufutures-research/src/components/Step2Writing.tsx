import { useResearchStore } from '../store/researchStore';
import { ElementType } from '../data/researchData';

export default function Step2Writing() {
  const { 
    selectedElements, 
    story, 
    setStory, 
    setCurrentStep, 
    generateStoryStarter 
  } = useResearchStore();
  
  // Handle going back to step 1
  const handleBack = () => {
    setCurrentStep(1);
  };
  
  // Handle the AI generation button click
  const handleGenerateStory = () => {
    generateStoryStarter();
  };
  
  // Display a selected element card
  const SelectedElementCard = ({ title, element }: { title: string; element: ElementType | null }) => {
    if (!element) return null;
    
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="font-semibold text-gray-700">{title}</div>
        <div className="text-lg font-medium text-blue-700">{element.title}</div>
        <div className="text-sm text-gray-600">{element.description}</div>
      </div>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Write Your Speculative Scenario</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Based on your selected elements, write a short story about the future of digital education.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Selected Elements</h2>
          
          <SelectedElementCard title="Arc" element={selectedElements.arc} />
          <SelectedElementCard title="Object" element={selectedElements.object} />
          <SelectedElementCard title="Terrain" element={selectedElements.terrain} />
          <SelectedElementCard title="Mood" element={selectedElements.mood} />
          
          <div className="pt-4">
            <button
              onClick={handleGenerateStory}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Generate Story Starter with AI</span>
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <label htmlFor="story" className="block text-xl font-semibold text-gray-800 mb-4">
            Your Story
          </label>
          <textarea
            id="story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="w-full h-80 p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Start writing your story here..."
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back to Selection
        </button>
        
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!story.trim()}
          className={`
            py-3 px-8 rounded-lg text-lg font-medium transition-all duration-300
            ${story.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Continue to Submit
        </button>
      </div>
    </div>
  );
} 