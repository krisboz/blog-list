import { useState } from "react";
import blogs from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = async (event) => {
    console.log(event.target);
    blogs.like(blog.id);
  };

  const handleDelete = async (event) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const delRes = blogs.deleteOne(blog.id).catch((error) => error.message);

      console.log("delete outcome", delRes);
    }
  };

  const style = {
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  if (isExpanded) {
    return (
      <div style={style}>
        <p>
          {blog.title}
          <span>
            {" "}
            <button onClick={toggleExpanded}>Collapse</button>
            {user.username === blog.user && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </span>
        </p>
        <p>{blog.url}</p>
        <p>{blog.user}</p>
        <p>
          Likes: {blog.likes}{" "}
          <span>
            <button onClick={handleLike}>Like</button>
          </span>
        </p>
      </div>
    );
  }

  return (
    <div style={style}>
      {blog.title} {blog.user}{" "}
      <button onClick={toggleExpanded}>View More</button>
    </div>
  );
};

export default Blog;
