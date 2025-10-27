
/**
 * Renders a table of past quizzes.
 * Props:
 * - history: Array of history items.
 * - onViewDetails: Function to call with quiz ID when "Details" is clicked.
 */
function HistoryTable({ history, onViewDetails }) {
    if (!history || history.length === 0) {
        return <p className="text-gray-500">No quiz history found.</p>;
    }

    return (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th scope="col" className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-600 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-600 uppercase tracking-wider">
                            URL
                        </th>
                        <th scope="col" className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-left text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="relative px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7">
                            <span className="sr-only">Details</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {history.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
                                {item.id}
                            </td>
                            <td className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-800 font-medium">
                                {item.title}
                            </td>
                            <td className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600 truncate max-w-xs">
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                                    {item.url}
                                </a>
                            </td>
                            <td className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600">
                                {new Date(item.date_generated).toLocaleString()}
                            </td>
                            <td className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 whitespace-nowrap text-right text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium">
                                <button
                                    onClick={() => onViewDetails(item.id)}
                                    className="px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryTable;
