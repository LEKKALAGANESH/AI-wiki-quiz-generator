/**
 * Functions for communicating with the FastAPI backend.
 */

// Set the base URL for the API.
// Make sure your FastAPI server is running on port 8000.
const API_URL = "http://localhost:8000";

/**
 * Generates a new quiz by sending a URL to the backend.
 * @param {string} url - The Wikipedia URL to process.
 * @returns {Promise<object>} - The generated quiz data.
 */
export const generateQuiz = async (url) => {
    const response = await fetch(`${API_URL}/generate_quiz`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate quiz');
    }
    return response.json();
};

/**
 * Fetches the list of all previously generated quizzes.
 * @returns {Promise<Array<object>>} - A list of history items.
 */
export const getHistory = async () => {
    const response = await fetch(`${API_URL}/history`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch history');
    }
    return response.json();
};

/**
 * Fetches the full data for a single quiz by its ID.
 * @param {number} quiz_id - The ID of the quiz to fetch.
 * @returns {Promise<object>} - The full quiz data object.
 */
export const getQuizById = async (quiz_id) => {
    const response = await fetch(`${API_URL}/quiz/${quiz_id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch quiz details');
    }
    return response.json();
};
