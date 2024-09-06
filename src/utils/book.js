function checkBook(book) {
  if (!book.title) {
    throw new Error("Title is required");
  }
  if (!book.authorId) {
    throw new Error("Author ID is required");
  }
  if (!book.publisherId) {
    throw new Error("Publisher ID is required");
  }
  if (!book.publishedDate) {
    throw new Error("Published Date is required");
  }
  if (!book.genre) {
    throw new Error("Genre is required");
  }
}


module.exports = {
  checkBook,
};
