import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str) -> (str, str): # [cite: 45]
    """
    Scrapes a Wikipedia article, cleans it, and returns the title and clean text.
    Returns: (title, clean_text)
    """
    try:
        response = requests.get(url, headers={"User-Agent": "MyQuizApp/1.0"})
        response.raise_for_status() # Raise error for bad responses

        soup = BeautifulSoup(response.content, 'html.parser') # [cite: 45]

        # Extract the title [cite: 48]
        title = soup.find('h1', id='firstHeading').get_text()

        # Extract the main content body [cite: 46]
        content_div = soup.find('div', id='mw-content-text')
        
        if not content_div:
            raise ValueError("Could not find main content block.")

        # Remove unwanted elements like references, tables, etc. [cite: 47]
        for tag in content_div.find_all(['sup', 'table', '.mw-editsection']):
            tag.decompose()
        
        # Get all paragraph texts
        paragraphs = content_div.find_all('p')
        
        # Concatenate paragraphs into a single clean text block
        clean_text = "\n".join([p.get_text() for p in paragraphs if p.get_text().strip()])

        # Basic text cleaning
        clean_text = clean_text.replace('[edit]', '')
        
        if not clean_text:
             raise ValueError("Article body is empty or could not be parsed.")

        return title, clean_text # [cite: 48]

    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        raise
    except Exception as e:
        print(f"Error parsing content: {e}")
        raise