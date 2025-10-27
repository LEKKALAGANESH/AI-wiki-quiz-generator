import { useEffect, useState } from 'react';
import HistoryTable from '../components/HistoryTable.jsx';
import QuizDisplay from '../components/QuizDisplay.jsx';
import { getHistory, getQuizById } from '../services/api.js';

/**
 * Component for "Tab 2 - Past Quizzes (History)".
 * Fetches and displays the history table and handles the details modal.
 */
function HistoryTab() {
    const [history, setHistory] = useState([]);
    const [selectedQuizData, setSelectedQuizData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // For loading the table
    const [isModalLoading, setIsModalLoading] = useState(false); // For loading modal content
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch history on component mount
    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to load history.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // Handle clicking the "View Details" button
    const handleViewDetails = async (quizId) => {
        setIsModalOpen(true);
        setIsModalLoading(true);
        setSelectedQuizData(null);
        setError(null);

        try {
            const data = await getQuizById(quizId);
            setSelectedQuizData(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to load quiz details.');
        } finally {
            setIsModalLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuizData(null);
        setError(null);
    };

    return (
        <div className="max-w-7xl mx-auto py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 text-gray-900">Quiz History</h2>

            {isLoading && <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Loading history...</p>}

            {error && !isModalOpen && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 rounded-md mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span>{error}</span>
                </div>
            )}

            {!isLoading && !error && (
                <HistoryTable history={history} onViewDetails={handleViewDetails} />
            )}

            {/* --- Details Modal --- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl w-full max-h-[95vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white">
                                Quiz Details
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-white hover:text-gray-200 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                            >
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8">
                            {isModalLoading && (
                                <div className="flex justify-center items-center py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16">
                                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 border-b-2 border-blue-600"></div>
                                    <p className="ml-3 sm:ml-4 text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Loading quiz details...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-300 text-red-800 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 rounded-xl" role="alert">
                                    <strong className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Error: </strong>
                                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{error}</span>
                                </div>
                            )}

                            {!isModalLoading && selectedQuizData && (
                                <QuizDisplay quizData={selectedQuizData} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HistoryTab;

