import { useState } from "react";

const BlogForm = ({ handlePost }) => {
  const [newBlog, setNewBlog] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleLinkChange = (event) => {
    setNewLink(event.target.value);
  };

  const blogPost = {
    title: newBlog,
    url: newLink,
  };

  return (
    <form
      onSubmit={(event) => handlePost(event, blogPost)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>Blog Title</p>
      <input value={newBlog} onChange={handleBlogChange} required={true} />
      <p>URL</p>
      <input value={newLink} onChange={handleLinkChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
