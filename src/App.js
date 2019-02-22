import React, {
  useState,
  useEffect
} from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [
    username,
    setUsername
  ] = useState("")
  const [
    password,
    setPassword
  ] = useState("")
  const [user, setUser] = useState(null)
  const [
    errorMessage,
    setErrorMessage
  ] = useState("")

  const [
    blogTitle,
    setBlogTitle
  ] = useState("")
  const [
    blogAuthor,
    setBlogAuthor
  ] = useState("")
  const [
    blogUrl,
    setBlogUrl
  ] = useState("")

  const [
    blogFormVisible,
    setBlogFormVisible
  ] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedBlogappUser"
    )
    if (loggedUserJSON) {
      const user = JSON.parse(
        loggedUserJSON
      )
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(
        {
          username,
          password
        }
      )

      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage(
        "käyttäjätunnus tai salasana virheellinen"
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem(
      "loggedBlogappUser"
    )
    setUser(null)
    setUsername("")
    setPassword("")
  }

  const handleSendBlog = async event => {
    event.preventDefault()
    console.log(
      "title, author, url",
      blogTitle,
      blogAuthor,
      blogUrl
    )
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogService.setToken(user.token)
    /*
      blogService
        .create(blogObject).then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setBlogAuthor('')
          setBlogTitle('')
          setBlogUrl('')
        })
      }
*/

    try {
      const blog = await blogService.create(
        blogObject
      )
      setBlogs(blogs.concat(blog))
      setBlogAuthor("")
      setBlogTitle("")
      setBlogUrl("")
    } catch (exception) {
      setErrorMessage(
        "Blogin lähetys ei onnistunut."
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogList = () => (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>
      Kirjaudu ulos
    </button>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) =>
            setUsername(target.value)
          }
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) =>
            setPassword(target.value)
          }
        />
      </div>
      <button type="submit">
        Kirjaudu
      </button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = {
      display: blogFormVisible
        ? "none"
        : ""
    }
    const showWhenVisible = {
      display: blogFormVisible
        ? ""
        : "none"
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            onClick={() =>
              setBlogFormVisible(true)
            }
          >
            Näytä bloginlisäys
          </button>
        </div>
        <div style={showWhenVisible}>
          <button
            onClick={() =>
              setBlogFormVisible(false)
            }
          >
            Piilota bloginlisäys
          </button>
          <form
            onSubmit={handleSendBlog}
          >
            <div>
              Title
              <input
                type="text"
                value={blogTitle}
                name="Title"
                onChange={({
                  target
                }) =>
                  setBlogTitle(
                    target.value
                  )
                }
              />
            </div>
            <div>
              Author
              <input
                type="text"
                value={blogAuthor}
                name="Author"
                onChange={({
                  target
                }) =>
                  setBlogAuthor(
                    target.value
                  )
                }
              />
            </div>
            <div>
              Url
              <input
                type="url"
                value={blogUrl}
                name="Url"
                onChange={({
                  target
                }) =>
                  setBlogUrl(
                    target.value
                  )
                }
              />
            </div>
            <button type="submit">
              Tallenna
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
