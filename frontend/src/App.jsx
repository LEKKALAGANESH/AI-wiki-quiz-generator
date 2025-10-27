import { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab.jsx';
import HistoryTab from './tabs/HistoryTab.jsx';

/**
 * Main React component.
 * Handles tab switching between "Generate Quiz" and "History".
 */
function App() {
  const [activeTab, setActiveTab] = useState('generate'); // 'generate' or 'history'

  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? 'border-blue-600 text-blue-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* --- Header --- */}
      <header className="bg-linear-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 flex justify-center items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-center text-white drop-shadow-md">
            AI Wiki Quiz
          </h1>
        </div>
      </header>

      {/* --- Tab Navigation --- */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          <div className="flex justify-center -mb-px">
            <button
              onClick={() => setActiveTab('generate')}
              className={`py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 border-b-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-colors duration-200 ${getTabClass('generate')}`}
            >
              Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 border-b-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-colors duration-200 ${getTabClass('history')}`}
            >
              History
            </button>
          </div>
        </div>
      </nav>

      {/* --- Tab Content --- */}
      <main className="flex-1">
        {activeTab === 'generate' && <GenerateQuizTab />}
        {activeTab === 'history' && <HistoryTab />}
      </main>
    </div>
  );
}

export default App;