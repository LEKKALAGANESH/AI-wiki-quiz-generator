# AI Wiki Quiz Generator

An AI-powered application that generates multiple-choice quizzes from Wikipedia articles. The system scrapes content from Wikipedia, uses OpenAI's GPT models to create questions, and provides a modern web interface for quiz generation and history tracking.

## Features

- **Quiz Generation**: Input any Wikipedia URL to generate a 5-10 question multiple-choice quiz
- **AI-Powered**: Uses OpenAI GPT-3.5-turbo to create relevant questions with explanations
- **History Tracking**: Stores all generated quizzes in a local SQLite database
- **Web Interface**: Modern React frontend with tabbed navigation
- **CORS Enabled**: Supports cross-origin requests for frontend-backend communication
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Rich Quiz Display**: Shows title, summary, key entities, sections, questions, and related topics

## Tech Stack

### Backend
- **FastAPI**: High-performance web framework for building APIs
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Local database for quiz storage
- **LangChain**: Framework for LLM integration
- **OpenAI GPT-3.5-turbo**: AI model for quiz generation
- **BeautifulSoup**: HTML parsing for Wikipedia scraping
- **Requests**: HTTP client for web scraping

### Frontend
- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: HTTP client for API calls

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-dotenv requests beautifulsoup4 langchain-core langchain-openai
   ```

4. Create a `.env` file in the backend directory and add your API key:
   ```
   GEMINI_API_KEY=your_openai_api_key_here
   ```

5. Run the backend server:
   ```bash
   python main.py
   ```
   Or with uvicorn:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Quick Start

1. **Start Backend**: `cd backend && python main.py`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: Go to `http://localhost:5173`
4. **Generate Quiz**: Enter a Wikipedia URL and click "Generate Quiz"

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Click on the "Generate Quiz" tab
3. Enter a valid Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Python_(programming_language)`)
4. Click "Generate Quiz" to create questions
5. View the generated quiz with answers and explanations
6. Switch to the "History" tab to see all previously generated quizzes
7. Click "View Details" on any quiz to see the full content

## API Endpoints

### POST /generate_quiz
Generates a new quiz from a Wikipedia URL.

**Request Body:**
```json
{
  "url": "https://en.wikipedia.org/wiki/Example"
}
```

**Response:**
```json
{
  "title": "Example",
  "summary": "Brief summary of the article...",
  "key_entities": ["Entity 1", "Entity 2"],
  "sections": ["Section 1", "Section 2"],
  "quiz": [
    {
      "question": "What is an example?",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "Explanation here...",
      "difficulty": "easy"
    }
  ],
  "related_topics": ["Topic 1", "Topic 2"]
}
```

**Error Responses:**
- `422 Unprocessable Entity`: Invalid URL format
- `500 Internal Server Error`: Scraping or LLM generation failed

### GET /history
Retrieves a list of all generated quizzes.

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://en.wikipedia.org/wiki/Example",
    "title": "Example",
    "date_generated": "2023-12-01T12:00:00Z"
  }
]
```

**Error Responses:**
- `500 Internal Server Error`: Database query failed

### GET /quiz/{quiz_id}
Retrieves the full details of a specific quiz.

**Parameters:**
- `quiz_id` (path): Integer ID of the quiz

**Response:** Same as `/generate_quiz` response.

**Error Responses:**
- `404 Not Found`: Quiz with given ID does not exist
- `500 Internal Server Error`: Database query or JSON parsing failed

## Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Database models and Pydantic schemas
│   ├── database.py          # Database configuration
│   ├── scraper.py           # Wikipedia scraping logic
│   ├── llm_quiz_generator.py # AI quiz generation
│   └── quiz_history.db      # SQLite database
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── components/      # Reusable components
│   │   ├── tabs/            # Tab components
│   │   └── services/        # API service functions
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .env                     # Environment variables (backend)
```

## Configuration

### Environment Variables
Create a `.env` file in the `backend/` directory:

```
GEMINI_API_KEY=your_openai_api_key_here
```

### CORS Settings
The backend is configured to allow requests from:
- `http://localhost:3000` (Create React App default)
- `http://localhost:5173` (Vite default)

Update the `allow_origins` list in `backend/main.py` if needed.

### Database
The application uses SQLite for local development. The database file `quiz_history.db` is created automatically in the `backend/` directory.

#### Backend Testing
1. Start the backend server:
   ```bash
   cd backend
   python main.py
   ```
   Or with uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

2. Test API endpoints with curl:
   ```bash
   # Test root endpoint
   curl http://localhost:8000/

   # Generate a quiz
   curl -X POST http://localhost:8000/generate_quiz \
     -H "Content-Type: application/json" \
     -d '{"url": "https://en.wikipedia.org/wiki/Python_(programming_language)"}'

   # Get history
   curl http://localhost:8000/history

   # Get specific quiz
   curl http://localhost:8000/quiz/1
   ```

#### Frontend Testing
1. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open browser to `http://localhost:5173` and test:
   - Generate quiz with a valid Wikipedia URL
   - View quiz results
   - Switch to History tab
   - View details of a quiz in modal

#### Manual Testing Checklist
- [ ] Backend server starts without errors
- [ ] CORS allows frontend requests
- [ ] Quiz generation works with valid Wikipedia URLs
- [ ] Invalid URLs return appropriate errors
- [ ] History endpoint returns list of quizzes
- [ ] Quiz details endpoint returns full quiz data
- [ ] Frontend renders quiz with all fields (title, summary, key_entities, sections, quiz, related_topics)
- [ ] Modal displays quiz details correctly
- [ ] Database stores quizzes with scraped content

### Database
The application uses SQLite for local development and can be configured for PostgreSQL in production. For PostgreSQL, set the `DATABASE_URL` environment variable in `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/quizdb
```

Tables are created automatically on first run using SQLAlchemy.

### Error Handling
- Invalid URLs return 422 Unprocessable Entity
- Missing quizzes return 404 Not Found
- Internal errors return 500 Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Wikipedia for providing free knowledge
- OpenAI for the GPT-3.5-turbo API
- FastAPI and React communities for excellent documentation
