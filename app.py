import os
import re
import requests
import random
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OMDB_API_KEY = os.getenv("OMDB_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

app = Flask(__name__)

# Track shown movies in this session
shown_movies = set()


def fallback():
    return """1. The Grand Budapest Hotel | Comedy | Quirky and visually stunning
2. Moonrise Kingdom | Romance | Charming and whimsical love story
3. Parasite | Thriller | Gripping class struggle thriller"""


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    global shown_movies

    try:
        data = request.get_json()
        user_message = data.get("message", "").strip().lower()

        if not user_message:
            return jsonify({"error": "Empty message"}), 400

        if "thank" in user_message:
            return jsonify({
                "reply": "😊 You're welcome! Enjoy your movie!",
                "movies": []
            })

        seed = random.randint(1, 10000)
        avoid = ", ".join(shown_movies) if shown_movies else "none"

        prompt = f"""
You are a movie recommendation AI. Seed:{seed}

Rules:
1. ONLY answer if the user is DIRECTLY asking for movie recommendations.
2. If the user asks about a person, place, politics, news, or anything NOT about movies → reply EXACTLY: NOT_DOMAIN
3. "Introduction of Abhi", "CM of Punjab", "Who is Modi" → these are NOT movie requests → reply: NOT_DOMAIN
4. ONLY these are valid: "action movies", "scary movies", "suggest a comedy", "movies like Inception"
5. Do NOT suggest these already shown movies: {avoid}
6. After many clicks, repeating old movies is okay.

User: {user_message}

If valid movie request, reply in EXACTLY this format:
1. Title | Genre | Reason
2. Title | Genre | Reason
3. Title | Genre | Reason

If NOT a movie request, reply EXACTLY: NOT_DOMAIN
"""

        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200,
                temperature=1.0,
            )
            reply = response.choices[0].message.content.strip()

        except Exception as e:
            print(f"[Groq Error]: {e}")
            reply = fallback()

        if "NOT_DOMAIN" in reply:
            return jsonify({
                "reply": "⚠️ This question is not related to movies.",
                "movies": []
            })

        movies = parse_movies(reply)

        # Add to shown movies to avoid repeats next time
        for m in movies:
            shown_movies.add(m["title"])

        if OMDB_API_KEY:
            for m in movies:
                m["poster"] = fetch_poster(m["title"])

        return jsonify({"reply": reply, "movies": movies})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def parse_movies(text):
    pattern = re.compile(r"^\d+\.\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$", re.MULTILINE)
    movies = []
    for t, g, r in pattern.findall(text):
        movies.append({
            "title": t.strip(),
            "genre": g.strip(),
            "reason": r.strip(),
            "poster": None
        })
    return movies


def fetch_poster(title):
    try:
        url = "http://www.omdbapi.com/"
        params = {"apikey": OMDB_API_KEY, "t": title}
        res = requests.get(url, params=params).json()
        poster = res.get("Poster")
        if poster and poster != "N/A":
            return poster
    except:
        pass
    return None


if __name__ == "__main__":
    app.run(debug=True)