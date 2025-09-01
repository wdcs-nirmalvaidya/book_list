let books = [
  { title: "Atomic Habits", author: "James Clear", genre: "Self-help", price: 350, rating: 5 },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 200, rating: 4 },
  { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", price: 500, rating: 5 }
];

function displayBooks(bookArray = books) {
  const table = document.getElementById("bookList");
  table.innerHTML = "";

     bookArray.forEach((book, index) => {
      let row = `
      <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>₹${book.price}</td>
    <td>${book.rating}</td>
    <td><button class="delete-btn" onclick="deleteBook(${index})">Delete</button></td>
    </tr>
    `;
    table.innerHTML += row;
  });
}


function addBook() {
const title = document.getElementById("title").value.trim();
const author = document.getElementById("author").value.trim();
const genre= document.getElementById("genre").value.trim();
const price = Number(document.getElementById("price").value);
const rating = Number(document.getElementById("rating").value);
 const error  = document.getElementById("error");

  if (!title || !author) {
  error.textContent = "Title and Author cannot be empty!";
  return;
  }
  if (price <= 0 || isNaN(price)) {
  error.textContent = "Price must be greater than 0!";
    return;
  }
  if (rating < 1 || rating > 5 || isNaN(rating)) {
  error.textContent = "Rating must be between 1 and 5!";
    return;
  }

books.push({ title, author, genre, price, rating });
error.textContent = "";
displayBooks();
  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
 document.getElementById("author").value = "";
document.getElementById("genre").value = "";
   document.getElementById("price").value = "";
document.getElementById("rating").value = "";
}
function deleteBook(index) {
  books.splice(index, 1);
  displayBooks();
}


function filterBooks() {
     const searchTitle = document.getElementById("searchTitle").value.toLowerCase();
    const minPrice = Number(document.getElementById("minPrice").value) || 0;
      const maxPrice = Number(document.getElementById("maxPrice").value) || Infinity;

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(searchTitle) &&
    book.price >= minPrice &&
    book.price <= maxPrice
  );

  displayBooks(filtered);
}


function sortBooks(criteria) {
  if (criteria === "priceAsc") {
    books.sort((a, b) => a.price - b.price);
} else if (criteria === "priceDesc") {
    books.sort((a, b) => b.price - a.price);
} else if (criteria === "ratingDesc") {
    books.sort((a, b) => b.rating - a.rating);
  }
  displayBooks();
}

displayBooks();
