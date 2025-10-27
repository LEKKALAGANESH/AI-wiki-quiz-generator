import { useState } from 'react';
import QuizDisplay from '../components/QuizDisplay.jsx';
import { generateQuiz } from '../services/api.js';

/**
 * Component for "Tab 1 - Generate Quiz".
 * Contains the URL input form, loading state, and displays the result.
 */
function GenerateQuizTab() {
    const [url, setUrl] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple URL validation
        if (!url || !url.includes('wikipedia.org/wiki/')) {
            setError('Please enter a valid Wikipedia URL (e.g., https://en.wikipedia.org/wiki/...)');
            return;
        }

        setIsLoading(true);
        setQuizData(null);
        setError(null);

        try {
            // Call the API service
            const data = await generateQuiz(url);
            setQuizData(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 my-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
            {/* --- URL Input Form --- */}
            <form onSubmit={handleSubmit} className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl shadow-lg border border-gray-200">
                <label htmlFor="url-input" className="block text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-800 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
                    Enter Wikipedia URL
                </label>
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8">
                    <input
                        type="text"
                        id="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
                        className="flex-grow p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Generate Quiz'
                        )}
                    </button>
                </div>
            </form>

            {/* --- Error Display --- */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 rounded-md mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* --- Result Display --- */}
            {quizData && (
                <QuizDisplay quizData={quizData} />
            )}
        </div>
    );
}

export default GenerateQuizTab;

