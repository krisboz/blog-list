import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogsUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ content: "Wrong Username or Password", error: true });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        console.log("blogs", blogs.data);
        setBlogs(blogs.data);
      } catch (error) {
        setNotification("Error fetching blogs");
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogChange = async (event) => {
    event.preventDefault();
    setNewBlog(event.target.value);
  };

  const handlePost = async (event, blogPost) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    const newObject = {
      title: blogPost.title,
      url: blogPost.url,
      likes: 0,
    };
    blogService
      .create(newObject)
      .then(console.log("blog added"))
      .catch((error) => setNotification("You need to fill out all the fields"));
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogsUser");
    setUser(null);
  };

  return (
    <div style={{ paddingLeft: "3rem" }}>
      {notification && <Notification message={notification} />}

      {user && <button onClick={handleLogOut}>logout</button>}

      {!user ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <Togglable ref={blogFormRef} buttonLabel="Add new Blog">
          <BlogForm handlePost={handlePost} />
        </Togglable>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
