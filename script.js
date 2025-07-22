function blogNav(el){
    // Deactivate all buttons with the class "myButton"
    const items1 = [
        { date: "10/17/2018", title: "climbing1", summary:"summary1" },
        { date: "10/18/2018", title: "climbing2", summary:"summary2" },
      ];
      const items2 = [
        { date: "10/17/2019", title: "book1", summary:"summary1" },
        { date: "10/18/2019", title: "books2", summary:"summary2" },
      ];

    var button = el
    console.log(el)
    
    let comp = el.id.localeCompare("climbingBlogButton");
    if(comp == 0){
        console.log("climbing button")
        loadTableData(items1);
        loadTableData([]);
    }

    comp = el.id.localeCompare("booksBlogButton");
    if(comp == 0){
        console.log("books button")
        loadTableData(items2);
        loadTableData([]);
    }

      
}
        


function loadTableData(items) {

    const table = document.getElementById("testBody");
    items.forEach( item => {
      let row = table.insertRow();
      let date = row.insertCell(0);
      date.innerHTML = item.date;
      let title = row.insertCell(1);
      title.innerHTML = item.title;
      let summary = row.insertCell(2);
      summary.innerHTML = item.summary;
    });
  
  }

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
    card.querySelector('.read-more').addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function() {
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