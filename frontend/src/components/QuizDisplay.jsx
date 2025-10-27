
/**
 * A reusable component to render the full structured quiz data.
 * Expects quizData as a prop, matching the API output structure.
 */
function QuizDisplay({ quizData }) {
    if (!quizData) {
        return null;
    }

    const { title, summary, key_entities, sections, quiz, related_topics } = quizData;

    // Helper to apply conditional styling for the correct answer
    const getOptionClass = (option, answer) => {
        return option === answer
            ? 'bg-green-100 border-green-300'
            : 'bg-white';
    };

    // Helper to apply conditional styling for difficulty
    const getDifficultyClass = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-200 text-green-800';
            case 'medium':
                return 'bg-yellow-200 text-yellow-800';
            case 'hard':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-14">
            {/* --- Title and Summary Card --- */}
            <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-gray-900">{title}</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-700 leading-relaxed italic">{summary}</p>
            </div>

            {/* --- Key Entities Section --- */}
            {key_entities && key_entities.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-xl border border-indigo-200">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-indigo-900">Key Entities</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
                        {key_entities.map((entity, index) => (
                            <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-full shadow-sm border border-indigo-200"
                            >
                                {entity}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Sections Section --- */}
            {sections && sections.length > 0 && (
                <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-gray-900">Article Sections</h3>
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7">
                        {sections.map((section, index) => (
                            <li
                                key={index}
                                className="flex items-center text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                            >
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                {section}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* --- Quiz Questions Section --- */}
            <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-gray-900">Quiz Questions</h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7 2xl:space-y-8">
                    {quiz.map((q, index) => (
                        <div key={index} className="bg-gray-50 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-lg border border-gray-300 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 gap-2">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-900 leading-relaxed flex-1">
                                    {index + 1}. {q.question}
                                </p>
                                <span
                                    className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-full flex-shrink-0 ${getDifficultyClass(q.difficulty)}`}
                                >
                                    {q.difficulty}
                                </span>
                            </div>
                            <ul className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-7 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
                                {q.options.map((option, i) => (
                                    <li
                                        key={i}
                                        className={`p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 border-2 rounded-lg text-gray-800 font-medium transition-all duration-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ${getOptionClass(option, q.answer)}`}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-blue-50 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-lg border-l-4 border-blue-500">
                                <p className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                                    <span className="font-bold text-blue-900">Explanation: </span>
                                    {q.explanation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Related Topics Section --- */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-xl border border-green-200">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-green-900">Related Topics</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
                    {related_topics.map((topic, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-full shadow-sm border border-green-300 hover:bg-green-200 transition-colors duration-200"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuizDisplay;
