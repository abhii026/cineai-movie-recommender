// /**
//  * AI Movie Recommender — script.js
//  * Abhishek Singh | INT428: AI Essentials
//  * Handles: chat UI, Flask API calls, movie card rendering with hover
//  */

// // ── DOM refs ──────────────────────────────────────────────────────────────
// const chatBody  = document.getElementById("chatBody");
// const userInput = document.getElementById("userInput");
// const sendBtn   = document.getElementById("sendBtn");

// // ── Chat history (sent to backend for context) ────────────────────────────
// let chatHistory = [];

// // ── Enter key to send ─────────────────────────────────────────────────────
// userInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     sendMessage();
//   }
// });

// // ── Genre sidebar button click ────────────────────────────────────────────
// function sendChip(text) {
//   userInput.value = text;
//   sendMessage();
// }

// // ── MAIN: send message ────────────────────────────────────────────────────
// async function sendMessage() {
//   const text = userInput.value.trim();
//   if (!text) return;

//   userInput.value = "";
//   setLoading(true);

//   // Render user bubble
//   appendBubble("user", text);

//   // Show typing dots
//   const typingId = showTyping();

//   try {
//     const res = await fetch("/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: text, history: chatHistory })
//     });

//     const data = await res.json();
//     removeEl(typingId);

//     if (data.error) {
//       appendBubble("bot", `⚠️ ${data.error}`);
//     } else {
//       // Show formatted AI reply
//       appendBubble("bot", data.reply);

//       // Show movie cards if parsed
//       if (data.movies && data.movies.length > 0) {
//         appendMovieCards(data.movies);
//       }

//       // Update history
//       chatHistory.push({ role: "user",      content: text });
//       chatHistory.push({ role: "assistant", content: data.reply });
//     }

//   } catch (err) {
//     removeEl(typingId);
//     appendBubble("bot", "⚠️ Cannot reach server. Make sure Flask is running.");
//     console.error(err);
//   }

//   setLoading(false);
//   scrollBottom();
// }

// // ── Append a chat bubble ──────────────────────────────────────────────────
// function appendBubble(role, text) {
//   const isBot = role === "bot";
//   const row = document.createElement("div");
//   row.className = `message ${isBot ? "bot-message" : "user-message"}`;

//   row.innerHTML = `
//     <div class="avatar-wrap">${isBot ? "🤖" : "👤"}</div>
//     <div class="bubble">${isBot ? formatReply(text) : escHtml(text)}</div>
//   `;

//   chatBody.appendChild(row);
//   scrollBottom();
// }

// // ── Format bot reply: bold title before first pipe ────────────────────────
// function formatReply(text) {
//   const safe = escHtml(text);
//   return safe
//     .replace(
//       /^(\d+\.\s*)(.+?)(\s*\|)/gm,
//       (_, n, title, pipe) =>
//         `${n}<strong style="color:#e0eeff">${title}</strong>${pipe}`
//     )
//     .replace(/\n/g, "<br>");
// }

// // ── Escape HTML ───────────────────────────────────────────────────────────
// function escHtml(str) {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// // ── Append movie cards grid ───────────────────────────────────────────────
// function appendMovieCards(movies) {
//   const section = document.createElement("div");
//   section.className = "movies-section";

//   section.innerHTML = `<p class="movies-label">🎬 Your Picks</p>`;

//   const grid = document.createElement("div");
//   grid.className = "movies-grid";

//   movies.forEach(movie => {
//     const card = document.createElement("div");
//     card.className = "movie-card";

//     // Poster or placeholder
//     const posterHTML = movie.poster
//       ? `<img src="${movie.poster}" alt="${escHtml(movie.title)}" loading="lazy">`
//       : `<div class="poster-placeholder">
//            <span>🎬</span>
//            <p>No Poster</p>
//          </div>`;

//     card.innerHTML = `
//       ${posterHTML}
//       <div class="card-overlay">
//         <p class="overlay-title">${escHtml(movie.title)}</p>
//         <p class="overlay-reason">${escHtml(movie.reason)}</p>
//       </div>
//       <div class="card-info">
//         <p class="card-title" title="${escHtml(movie.title)}">${escHtml(movie.title)}</p>
//         <span class="card-genre">🎭 ${escHtml(movie.genre)}</span>
//       </div>
//     `;

//     grid.appendChild(card);
//   });

//   section.appendChild(grid);
//   chatBody.appendChild(section);
//   scrollBottom();
// }

// // ── Typing indicator ──────────────────────────────────────────────────────
// function showTyping() {
//   const id = "typing-" + Date.now();
//   const row = document.createElement("div");
//   row.className = "message bot-message";
//   row.id = id;
//   row.innerHTML = `
//     <div class="avatar-wrap">🤖</div>
//     <div class="bubble typing-bubble">
//       <span></span><span></span><span></span>
//     </div>
//   `;
//   chatBody.appendChild(row);
//   scrollBottom();
//   return id;
// }

// // ── Helpers ───────────────────────────────────────────────────────────────
// function removeEl(id) {
//   const el = document.getElementById(id);
//   if (el) el.remove();
// }

// function setLoading(on) {
//   sendBtn.disabled   = on;
//   userInput.disabled = on;
//   if (!on) userInput.focus();
// }

// function scrollBottom() {
//   chatBody.scrollTop = chatBody.scrollHeight;
// }

/**
 * AI Movie Recommender — FINAL PREMIUM VERSION
 * Clean UI, no duplicate text, typing animation, smooth UX
 */

// ── DOM refs ─────────────────────────────────────────────
const chatBody  = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn   = document.getElementById("sendBtn");

// ── Chat history ─────────────────────────────────────────
let chatHistory = [];

// ── Enter key support ────────────────────────────────────
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ── Sidebar quick buttons ────────────────────────────────
function sendChip(text) {
  userInput.value = text;
  sendMessage();
}

// ── MAIN: send message ───────────────────────────────────
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  userInput.value = "";
  setLoading(true);

  appendBubble("user", text);

  const typingId = showTyping();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: chatHistory })
    });

    const data = await res.json();
    removeEl(typingId);

    if (data.error) {
      appendBubble("bot", `⚠️ ${data.error}`);
    } else {
      // 🔥 PREMIUM FIX: NO DUPLICATE TEXT
      if (data.movies && data.movies.length > 0) {
        appendMovieCards(data.movies);
      } else {
        appendBubble("bot", data.reply);
      }

      // Update history
      chatHistory.push({ role: "user", content: text });
      chatHistory.push({ role: "assistant", content: data.reply });
    }

  } catch (err) {
    removeEl(typingId);
    appendBubble("bot", "⚠️ Cannot reach server. Make sure Flask is running.");
    console.error(err);
  }

  setLoading(false);
  scrollBottom();
}

// ── Append chat bubble ───────────────────────────────────
function appendBubble(role, text) {
  const isBot = role === "bot";

  const row = document.createElement("div");
  row.className = `message ${isBot ? "bot-message" : "user-message"}`;

  row.innerHTML = `
    <div class="avatar-wrap">${isBot ? "🤖" : "👤"}</div>
    <div class="bubble">${isBot ? formatReply(text) : escHtml(text)}</div>
  `;

  chatBody.appendChild(row);
  scrollBottom();
}

// ── Format reply (bold movie titles) ─────────────────────
function formatReply(text) {
  const safe = escHtml(text);
  return safe
    .replace(
      /^(\d+\.\s*)(.+?)(\s*\|)/gm,
      (_, n, title, pipe) =>
        `${n}<strong style="color:#e0eeff">${title}</strong>${pipe}`
    )
    .replace(/\n/g, "<br>");
}

// ── Escape HTML ──────────────────────────────────────────
function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Movie cards ──────────────────────────────────────────
function appendMovieCards(movies) {
  const section = document.createElement("div");
  section.className = "movies-section";

  section.innerHTML = `<p class="movies-label">🎬 Your Picks</p>`;

  const grid = document.createElement("div");
  grid.className = "movies-grid";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const posterHTML = movie.poster
      ? `<img src="${movie.poster}" alt="${escHtml(movie.title)}" loading="lazy">`
      : `<div class="poster-placeholder">
           <span>🎬</span>
           <p>No Poster</p>
         </div>`;

    card.innerHTML = `
      ${posterHTML}
      <div class="card-overlay">
        <p class="overlay-title">${escHtml(movie.title)}</p>
        <p class="overlay-reason">${escHtml(movie.reason)}</p>
      </div>
      <div class="card-info">
        <p class="card-title" title="${escHtml(movie.title)}">${escHtml(movie.title)}</p>
        <span class="card-genre">🎭 ${escHtml(movie.genre)}</span>
      </div>
    `;

    grid.appendChild(card);
  });

  section.appendChild(grid);
  chatBody.appendChild(section);
  scrollBottom();
}

// ── Typing animation ─────────────────────────────────────
function showTyping() {
  const id = "typing-" + Date.now();

  const row = document.createElement("div");
  row.className = "message bot-message";
  row.id = id;

  row.innerHTML = `
    <div class="avatar-wrap">🤖</div>
    <div class="bubble typing-bubble">
      <span></span><span></span><span></span>
      <p style="font-size:12px;opacity:0.7;margin-top:4px;">Thinking...</p>
    </div>
  `;

  chatBody.appendChild(row);
  scrollBottom();
  return id;
}

// ── Helpers ──────────────────────────────────────────────
function removeEl(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function setLoading(on) {
  sendBtn.disabled = on;
  userInput.disabled = on;
  if (!on) userInput.focus();
}

function scrollBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}