# 🎬 CineAI — AI Movie Recommender Chatbot

> An AI-powered movie recommendation chatbot that suggests 3 movies with posters based on your genre or mood.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

---

## 🧠 Tech Stack

| Layer      | Technology                                                                 |
|------------|----------------------------------------------------------------------------|
| Backend    | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white) |
| AI Model   | ![Groq](https://img.shields.io/badge/Groq_LLaMA_3.3_70B-F55036?style=flat&logo=groq&logoColor=white) |
| Movie Data | ![OMDB](https://img.shields.io/badge/OMDB_API-F5C518?style=flat&logo=imdb&logoColor=black) |
| Frontend   | ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| Config     | ![dotenv](https://img.shields.io/badge/.env-ECD53F?style=flat&logo=dotenv&logoColor=black) |

---

## 📁 Folder Structure

```
movie-chatbot/
├── app.py               ← Flask backend + Groq AI logic
├── templates/
│   └── index.html       ← Chatbot UI
├── static/
│   ├── style.css        ← Dark theme styling
│   └── script.js        ← Chat logic, movie card rendering
├── .env                 ← API keys (never commit this!)
├── .gitignore           ← Ignores .env, pycache, venv
├── requirements.txt     ← Python dependencies
└── README.md
```

---

## ⚙️ How It Works

1. User types a genre or mood (or clicks a Quick Pick button)
2. Flask receives the message and sends it to **Groq's LLaMA 3.3 70B** model
3. AI returns 3 movie recommendations in structured format
4. App fetches **movie posters** from OMDB API
5. Frontend renders movie cards with poster, title, genre, and reason
6. Already shown movies are tracked so repeats are avoided each session

---

## 🤖 AI Concepts Used

- **LLM (Large Language Model)** — Groq LLaMA 3.3 generates recommendations
- **Prompt Engineering** — Strict rules in prompt to control AI output format and domain
- **NLP** — Natural language input understanding
- **REST API** — Flask endpoint + fetch() in JavaScript
- **Regex Parsing** — Extracts structured movie data from AI free-text response
- **Session Memory** — Tracks shown movies to avoid repeats

---

## 🛠️ Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/your-username/cineai-movie-recommender.git
cd cineai-movie-recommender/movie-chatbot
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Get API Keys (both free)

**Groq API Key:**
- Go to: https://console.groq.com
- Sign up → API Keys → Create Key

**OMDB API Key:**
- Go to: https://www.omdbapi.com/apikey.aspx
- Sign up for free key

### 4. Create `.env` file
```
GROQ_API_KEY=your_groq_key_here
OMDB_API_KEY=your_omdb_key_here
```

### 5. Run the app
```bash
python app.py
```

### 6. Open in browser
```
http://127.0.0.1:5000
```

---

## ✨ Features

- 🎯 Genre Quick Picks — Action, Comedy, Horror, Romance, Sci-Fi, Thriller, Animated
- 🎬 Movie cards with real posters fetched from OMDB
- 🔄 Different movies every click — no repeats in same session
- ⚠️ Off-topic query detection — only answers movie-related questions
- 💬 Natural language input — type anything like *"feel-good movies for weekend"*
- 🌙 Dark theme UI

---

## 📦 Requirements

```
flask
python-dotenv
requests
groq
```

Install all with:
```bash
pip install -r requirements.txt
```

---

## 👨‍💻 Authors

**Abhishek Singh & Ayush Singh**
INT428: Artificial Intelligence Essentials — 2025

---

## 📄 License

This project is for educational purposes only.