import React, {
  useState
} from "react"
//import '../App.css'
const Blog = ({
  blog
}) => {

  const [
    blogExpanded,
    setBlogExpanded
  ] = useState("content")

  
  const display = () => {
    return blogExpanded
  }

  const toggleExpansion = () => {
    if (blogExpanded === "content") setBlogExpanded("contentVisible")
    else setBlogExpanded("content")
  }
  return (
    <div>
      <button className="collapsible" onClick={toggleExpansion}>
        <h3>{blog.title} ({blog.author})</h3>
      </button>
      <div className={display()}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>Lisännyt {blog.user.name}</p>
      </div>
    </div>
  )
}
export default Blog
