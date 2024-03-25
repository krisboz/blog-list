const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("a valid post can be added ", async () => {
  const initialResponse = await api.get("/api/blogs");
  const initialBlogs = initialResponse.body;
  const newBlog = {
    title: "Test One",
    author: "Herr Ficker",
    url: "tbd",
    likes: 335,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.author);
  console.log("PIČKA: ", response.body.length);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(contents.includes("Herr Ficker"));
});

test("a post can be viewed", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  await api.get(`/api/blogs/${blogs[0].id}`).expect(200);
});

//

after(async () => {
  await mongoose.connection.close();
});
