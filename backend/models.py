from datetime import datetime
from typing import List, Literal

from database import Base  # Import Base from database.py
from pydantic import BaseModel, Field
from sqlalchemy import Column, DateTime, Integer, String, Text


# 1. SQLAlchemy Database Model 
class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True) # [cite: 36]
    url = Column(String, index=True) # [cite: 37]
    title = Column(String) # [cite: 38]
    date_generated = Column(DateTime, default=datetime.utcnow) # [cite: 39]
    
    # This field stores the serialized JSON string of the quiz [cite: 41, 42]
    full_quiz_data = Column(Text) 

    # Optional Bonus Field [cite: 40]
    scraped_content = Column(Text)


# 2. Pydantic Schemas for LLM Output [cite: 51, 148]

class QuizQuestion(BaseModel):
    question: str = Field(description="The text of the question") # [cite: 150]
    options: List[str] = Field(description="A list of four options (A-D)") # [cite: 151]
    answer: str = Field(description="The correct answer from the options list") # [cite: 152]
    explanation: str = Field(description="A short explanation for the correct answer") # [cite: 153]
    difficulty: Literal["easy", "medium", "hard"] = Field(description="Difficulty level") # [cite: 154]

class QuizOutput(BaseModel):
    title: str = Field(description="The main title of the Wikipedia article")
    summary: str = Field(description="A brief summary of the article")
    key_entities: List[str] = Field(description="List of key entities mentioned in the article")
    sections: List[str] = Field(description="List of main sections in the article")
    quiz: List[QuizQuestion] = Field(description="A list of 5-10 quiz questions")
    related_topics: List[str] = Field(description="List of suggested related topics") # [cite: 155]

# 3. Pydantic Schemas for API Endpoints

class QuizRequest(BaseModel):
    url: str # [cite: 63]

class QuizHistoryItem(BaseModel):
    id: int # [cite: 71]
    url: str # [cite: 71]
    title: str # [cite: 71]
    date_generated: datetime # [cite: 72]

    class Config:
        from_attributes = True
