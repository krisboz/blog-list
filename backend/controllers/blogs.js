const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");
const config = require("../utils/config");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const test = await Blog.findById(request.params.id);
  console.log("look at me", test);
  Blog.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: +1 } },
    { new: true }
  )
    .then((doc) => {
      response.json(doc);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    return error.message;
  }

  /**
     *     if (request.userId && request.userId === blog.author.toString()) {
      console.log("ITSA SAME PERSON");
  
    } else {
      throw new Error("You can only delete your own mesasges");
    }
     */
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(request.userId);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: user.id,
    user: user.username,
  });

  if (!body.title) {
    return response.status(400).json({ error: "You have to add a title!" });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
