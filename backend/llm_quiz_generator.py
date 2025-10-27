import os

from dotenv import load_dotenv
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from models import QuizOutput  # Import the Pydantic schema

# Load API key
load_dotenv()
if "GEMINI_API_KEY" not in os.environ:
    raise EnvironmentError("GEMINI_API_KEY (OpenAI API key) not found in .env file")

def generate_quiz_from_text(article_text: str) -> QuizOutput:
    """
    Uses LangChain and Gemini to generate a quiz from article text.
    """
    
    # 1. Initialize the Pydantic JSON parser [cite: 56]
    parser = JsonOutputParser(pydantic_object=QuizOutput)

    # 2. Define the Prompt Template [cite: 55]
    prompt_template = """
    You are an expert quiz creator. Your task is to generate a quiz from the
    provided Wikipedia article text.
    
    Based on the text below, generate a 5-10 question multiple-choice quiz.
    
    For each question, provide:
    1. The question text
    2. Four options (A-D)
    3. The correct answer
    4. A short explanation
    5. A difficulty level (easy, medium, hard)

    Also extract:
    1. The main title of the article.
    2. A short summary of the article (2-3 sentences).
    3. A list of key entities mentioned in the article (e.g., people, places, concepts).
    4. A list of main sections in the article.
    5. A list of 3-5 related Wikipedia topics for further reading.

    ARTICLE TEXT:
    {article_text}

    FORMAT INSTRUCTIONS:
    {format_instructions}
    """
    
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["article_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    # 3. Initialize the OpenAI Model [cite: 54]
    # Using GPT-3.5-turbo for cost-effective quiz generation
    model = ChatOpenAI(
        model="gpt-3.5-turbo",
        temperature=0.5,
        openai_api_key=os.environ.get("GEMINI_API_KEY")
    )

    # 4. Create the LangChain chain [cite: 58]
    chain = prompt | model | parser

    # 5. Invoke the chain
    try:
        quiz_data = chain.invoke({"article_text": article_text})
        return quiz_data
    except Exception as e:
        print(f"Error generating quiz: {e}")
        # Handle potential parsing errors or API errors
        raise