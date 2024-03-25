var _ = require("lodash");

const dummy = (blogs) => {
  if (blogs.length === 0) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else if (blogs.length > 1) {
    const res = blogs.reduce((acc, curr) => acc + curr.likes, 0);
    return res;
  }
};

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) =>
    prev && prev.likes > current.likes ? prev : current
  );
  return { title: max.title, author: max.author, likes: max.likes };
};

const mostBlogs = (blogs) => {};

module.exports = { dummy, totalLikes, favoriteBlog };
