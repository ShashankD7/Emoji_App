const url = "https://emojihub.yurace.pro/api/all";
const emojisPerPage = 10;
let filteredEmojis;
let allEmojis = [];
let currentPage = 1;

// Fetch emojis from the API
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    allEmojis = data;
    // displayEmojis(currentPage)
    filterEmojis();
  })
  .catch(error => {
    console.log("Error:", error);
  });

  // Filter emojis by category
function filterEmojis() {
    const category = document.getElementById("category").value.toLowerCase();
    filteredEmojis = (category === "")
      ? allEmojis
      : allEmojis.filter(
          emoji => emoji.category.toLowerCase().includes(category)
        );
    currentPage = 1;
    displayEmojis(currentPage, filteredEmojis);
  }

// Display emojis on the page
function displayEmojis(page, filteredEmojis) {

  const emojiContainer = document.getElementById("emojiContainer");
  const startIndex = (page - 1) * emojisPerPage;
  const endIndex = startIndex + emojisPerPage;
  const emojisToShow = filteredEmojis.slice(startIndex, endIndex);

  emojiContainer.innerHTML = "";

  emojisToShow.forEach(emoji => {
    const emojiCard = document.createElement("div");
    emojiCard.className = "emoji-card";

    const emojiCode = document.createElement("p");
    emojiCode.innerHTML = emoji.htmlCode;
    emojiCard.appendChild(emojiCode);

    const emojiDetails = document.createElement("div");
    emojiDetails.className = "emoji-details";

    const name = document.createElement("p");
    name.innerHTML = "<strong>Name:</strong> " + emoji.name;
    emojiDetails.appendChild(name);

    const category = document.createElement("p");
    category.innerHTML = "<strong>Category:</strong> " + emoji.category;
    emojiDetails.appendChild(category);

    const group = document.createElement("p");
    group.innerHTML = "<strong>Group:</strong> " + emoji.group;
    emojiDetails.appendChild(group);

    emojiCard.appendChild(emojiDetails);
    emojiContainer.appendChild(emojiCard);
  });

  updatePagination(page);
}

// Update pagination buttons and current page indicator
function updatePagination(page) {
  const currentPageElement = document.getElementById("currentPage");
  currentPageElement.innerHTML = page;

  const previousButton = document.querySelector(".pagination button:first-child");
  const nextButton = document.querySelector(".pagination button:last-child");

  previousButton.disabled = (page === 1);
  nextButton.disabled = (page === Math.ceil(allEmojis.length / emojisPerPage));
}

// Go to previous page
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayEmojis(currentPage, filteredEmojis);
  }
}

// Go to next page
function nextPage() {
  if (currentPage < Math.ceil(allEmojis.length / emojisPerPage)) {
    currentPage++;
    displayEmojis(currentPage, filteredEmojis);
  }
}


  
