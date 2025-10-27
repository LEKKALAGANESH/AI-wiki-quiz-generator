import json
import os
import sys
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(__file__))

import llm_quiz_generator
import models
import scraper
from database import SessionLocal, engine, get_db
from models import Quiz, QuizHistoryItem, QuizOutput, QuizRequest

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # Adjust to your React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI Wiki Quiz Generator API"}

# Endpoint 1: /generate_quiz (POST) [cite: 62]
@app.post("/generate_quiz", response_model=QuizOutput)
def create_quiz(request: QuizRequest, db: Session = Depends(get_db)):
    try:
        # 1. Scrape Wikipedia [cite: 64]
        title, clean_text = scraper.scrape_wikipedia(request.url)
        
        # 2. Call LLM chain [cite: 65]
        # Note: LLM will generate title, but we use the scraped one for the DB
        quiz_data_dict = llm_quiz_generator.generate_quiz_from_text(clean_text)
        
        # 3. Serialize quiz data for storage [cite: 41, 66]
        # We convert the Pydantic model (which is a dict) to a JSON string
        serialized_quiz_data = json.dumps(quiz_data_dict)

        # 4. Save to database [cite: 66, 67]
        db_quiz = models.Quiz(
            url=request.url,
            title=title, # Use the scraped title
            scraped_content=clean_text,  # Store the scraped content
            full_quiz_data=serialized_quiz_data
        )
        db.add(db_quiz)
        db.commit()
        db.refresh(db_quiz)
        
        # 5. Return the Pydantic model (FastAPI converts it to JSON) [cite: 68]
        return quiz_data_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 2: /history (GET) [cite: 69]
@app.get("/history", response_model=List[QuizHistoryItem])
def get_quiz_history(db: Session = Depends(get_db)):
    # Query for the simple list [cite: 70, 71]
    quizzes = db.query(
        models.Quiz.id,
        models.Quiz.url,
        models.Quiz.title,
        models.Quiz.date_generated
    ).order_by(models.Quiz.date_generated.desc()).all()
    
    # Convert list of tuples to list of dicts to match Pydantic model
    history_items = [
        {
            "id": quiz.id,
            "url": quiz.url,
            "title": quiz.title,
            "date_generated": quiz.date_generated
        }
        for quiz in quizzes
    ]
    return history_items


# Endpoint 3: /quiz/{quiz_id} (GET) [cite: 73]
@app.get("/quiz/{quiz_id}")
def get_quiz_details(quiz_id: int, db: Session = Depends(get_db)):
    # Fetch the specific quiz record [cite: 75]
    db_quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    
    if db_quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")

    # Crucial: Deserialize the JSON string back into a Python dict [cite: 76, 77]
    quiz_data = json.loads(db_quiz.full_quiz_data)
    
    return quiz_data

