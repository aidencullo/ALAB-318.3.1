function checkAuthor(author) {
  if (!author.name) {
    throw new Error('Author name is required');
  }
  if (!author.birthdate) {
    throw new Error('Author birthdate is required');
  }
  if (!author.nationality) {
    throw new Error('Author nationality is required');
  }
}

module.exports = {
  checkAuthor,
};
