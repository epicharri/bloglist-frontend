import React, { useState } from "react"
import blogService from "../services/blogs"

//import '../App.css'
const Blog = ({ blog, setBlogs, blogs }) => {
  const [
    blogExpanded,
    setBlogExpanded
  ] = useState("content")

  

  const display = () => {
    return blogExpanded
  }

  const toggleExpansion = () => {
    if (blogExpanded === "content")
      setBlogExpanded("contentVisible")
    else setBlogExpanded("content")
  }

  const handleLikeBlog = async event => {
    event.preventDefault()
    console.log("liketetty")

    const loggedUserJSON = window.localStorage.getItem(
      "loggedBlogappUser"
    )
    if (loggedUserJSON) {
      const user = JSON.parse(
        loggedUserJSON
      )
      //setUser(user)
      blogService.setToken(user.token)
    }

    //blogService.setToken(user.token)

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    try {
      const updatedBlog = await blogService.update(
        blog.id,
        blogObject
      )
      setBlogs(blogs.map(b => b.id === blog.id ? blogObject : b).sort(
        (x, y) => {return y.likes - x.likes}
      ))
    } catch (exception) {
      /*setErrorMessage(
        "Liken päivittäminen ei onnistunut."
      )*/
      setTimeout(() => {
        /* setErrorMessage(null)*/
      }, 5000)
    }
  }

  return (
    <div>
      <button
        className="collapsible"
        onClick={toggleExpansion}
        value={blog}
      >
        <h3>
          {blog.title} ({blog.author})
        </h3>
      </button>
      <div className={display()}>
        <a href={blog.url}>
          {blog.url}
        </a>
        <p>{blog.likes} likes</p>
        <button
          onClick={handleLikeBlog}
        >
          Like
        </button>
        <p>Lisännyt {blog.user.name}</p>
      </div>
    </div>
  )
}
export default Blog
