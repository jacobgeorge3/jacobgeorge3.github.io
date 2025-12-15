// Blog Cards Rendering and Filtering
function renderBlogCards(posts) {
  const container = document.getElementById('blog-cards');
  if (!container) return;
  container.innerHTML = '';
  if (!posts.length) {
    container.innerHTML = '<p style="color:#aaa;">No blog posts found.</p>';
    return;
  }
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <h3>${post.title}</h3>
      <div class="blog-date">${post.date}</div>
      <div class="blog-summary">${post.summary}</div>
      <span class="read-more" style="display:inline-block;">Read More</span>
      <div class="blog-content" style="display:none; margin-top:10px;">${post.content}</div>
    `;
    card.querySelector('.read-more').addEventListener('click', function () {
      const content = card.querySelector('.blog-content');
      if (content.style.display === 'none') {
        content.style.display = 'block';
        this.textContent = 'Show Less';
      } else {
        content.style.display = 'none';
        this.textContent = 'Read More';
      }
    });
    container.appendChild(card);
  });
}

function filterAndRenderBlogCards(allPosts) {
  let posts = [...allPosts];
  const search = document.getElementById('blog-search').value.toLowerCase();
  const dateSort = document.getElementById('blog-filter-date').value;
  const popSort = document.getElementById('blog-filter-popularity').value;

  // Search
  if (search) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(search) ||
      post.summary.toLowerCase().includes(search) ||
      post.content.toLowerCase().includes(search)
    );
  }
  // Date sort
  if (dateSort === 'newest') {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (dateSort === 'oldest') {
    posts.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  // Popularity sort
  if (popSort === 'most') {
    posts.sort((a, b) => b.popularity - a.popularity);
  } else if (popSort === 'least') {
    posts.sort((a, b) => a.popularity - b.popularity);
  }
  renderBlogCards(posts);
}

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel-cards');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: -270, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: 270, behavior: 'smooth' });
    });
  }
  fetch('blogData.json')
    .then(res => res.json())
    .then(data => {
      window._allBlogPosts = data;
      filterAndRenderBlogCards(data);
      document.getElementById('blog-search').addEventListener('input', () => filterAndRenderBlogCards(window._allBlogPosts));
      document.getElementById('blog-filter-date').addEventListener('change', () => filterAndRenderBlogCards(window._allBlogPosts));
      document.getElementById('blog-filter-popularity').addEventListener('change', () => filterAndRenderBlogCards(window._allBlogPosts));
    })
    .catch(() => {
      renderBlogCards([]);
    });
});

/* Goodreads Integration & Literature Bot */
const GOODREADS_ID = '132335893';
const RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_ID}?shelf=read`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

// TODO: Replace with your actual API key or use a secure proxy
const GEMINI_API_KEY = 'AIzaSyCcl4NwzcQydTZa9szS9rmbf8ysLhsOqAY';

let userBooks = [];

document.addEventListener('DOMContentLoaded', function () {
  const booksGrid = document.getElementById('books-grid');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  if (booksGrid) {
    fetchBooks();
  }

  if (chatInput && chatSend) {
    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChat();
    });
  }

  function fetchBooks() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          userBooks = data.items;
          renderBooks(userBooks);
        } else {
          booksGrid.innerHTML = '<p>Failed to load books. Please try again later.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        booksGrid.innerHTML = '<p>Error loading bookshelf.</p>';
      });
  }

  function renderBooks(books) {
    booksGrid.innerHTML = '';
    books.forEach(book => {
      // Extract cover image from description if possible, or use placeholder
      const coverMatch = book.description.match(/src="([^"]+)"/);
      const coverUrl = coverMatch ? coverMatch[1] : 'https://via.placeholder.com/150x200?text=No+Cover';

      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <img src="${coverUrl}" alt="${book.title}" class="book-cover">
        <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
          <div class="book-rating">★ ${book.rating || 'N/A'}</div>
        </div>
      `;
      booksGrid.appendChild(card);
    });
  }

  async function handleChat() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatInput.value = '';
    chatInput.disabled = true;
    chatSend.disabled = true;

    // Loading indicator
    const loadingId = addMessage('Thinking...', 'bot');

    try {
      const response = await callGeminiAPI(message);
      updateMessage(loadingId, response);
    } catch (error) {
      updateMessage(loadingId, "Sorry, I'm having trouble connecting to the library right now.");
      console.error(error);
    } finally {
      chatInput.disabled = false;
      chatSend.disabled = false;
      chatInput.focus();
    }
  }

  function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.textContent = text;
    msgDiv.id = `msg-${Date.now()}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv.id;
  }

  function updateMessage(id, text) {
    const msgDiv = document.getElementById(id);
    if (msgDiv) {
      msgDiv.textContent = text;
    }
  }

  async function callGeminiAPI(userMessage) {
    if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      return "I need an API key to function! Please add your Google Gemini API key to script.js.";
    }

    const bookList = userBooks.map(b => `${b.title} by ${b.author}`).join('\n');
    const prompt = `
      You are a Literature Bot. You are helpful, knowledgeable, and enthusiastic about books.
      The user has read the following books:
      ${bookList}

      User: ${userMessage}
      
      Answer the user's question based on the books they have read if applicable, or general literary knowledge. 
      Keep your response concise (under 3 sentences if possible) and engaging.
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.candidates[0].content.parts[0].text;
  }
});