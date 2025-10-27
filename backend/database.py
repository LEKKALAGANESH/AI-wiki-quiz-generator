import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables (if you store DB URL in .env)
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
# Example: "postgresql://user:password@localhost/quizdb"

# For this project, we'll use a simple file-based SQLite as a starting point
# as mentioned in the doc ("./quiz_history.db") [cite: 32]
# NOTE: The doc text [cite: 31] mistakenly says "MYSQL or POSTGRESQL file",
# but then gives a file path[cite: 32], which implies SQLite.
# I will proceed with SQLite as it matches the file path example.
# If you MUST use MySQL/PostgreSQL, just change this URL.

DATABASE_URL = DATABASE_URL or "sqlite:///./quiz_history.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} # check_same_thread is for SQLite only
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base() # [cite: 33]

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()