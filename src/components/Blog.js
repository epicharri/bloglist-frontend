import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

//import '../App.css'
const Blog = ({
  blog,
  setBlogs,
  blogs,
  user
}) => {
  console.log('blog', blog.PropTypes)

  const [
    blogExpanded,
    setBlogExpanded
  ] = useState('content')

  const display = () => {
    return blogExpanded
  }

  const toggleExpansion = () => {
    if (blogExpanded === 'content')
      setBlogExpanded('contentVisible')
    else setBlogExpanded('content')
  }

  const handleLikeBlog = async () => {
    //event.preventDefault()
    console.log('liketetty')
    /*
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
*/
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
      setBlogs(
        blogs
          .map(b =>
            b.id === blog.id
              ? updatedBlog
              : b
          )
          .sort((x, y) => {
            return y.likes - x.likes
          })
      )
    } catch (exception) {
      /*setErrorMessage(
        "Liken päivittäminen ei onnistunut."
      )*/
      setTimeout(() => {
        /* setErrorMessage(null)*/
      }, 5000)
    }
  }

  const handleDeleteBlog = async event => {
    const saaPoistaa = window.confirm(
      'Haluatko oikeesti poistaa tän!!??'
    )
    if (!saaPoistaa) return
    event.preventDefault()
    console.log('painettu poista blogi')
    const id = event.target.value //Että teen errormessagen tän avul

    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )
    if (loggedUserJSON) {
      const user = JSON.parse(
        loggedUserJSON
      )
      //setUser(user)
      blogService.setToken(user.token)
    }

    //blogService.setToken(user.token)

    try {
      await blogService.deleteBlog(
        blog.id
      )
      setBlogs(
        blogs
          .filter(b => b.id !== id && b)
          .sort((x, y) => {
            return y.likes - x.likes
          })
      )
    } catch (exception) {
      console.log(
        'Deletointi ei onnistunut :('
      )
      /*setErrorMessage(
        "Liken päivittäminen ei onnistunut."
      )*/
      setTimeout(() => {
        /* setErrorMessage(null)*/
      }, 5000)
    }
  }

  console.log(
    'blog.user.id on ',
    blog.user.id
  )
  console.log('user on ', user)

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
        {blog.user.name ===
        user.name ? (
            <button
              onClick={handleDeleteBlog}
              value={blog.id}
            >
            Poista blogi
            </button>
          ) : (
            <p />
          )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  setBlogs: PropTypes.func,
  blogs: PropTypes.array,
  user: PropTypes.object
}

export default Blog
