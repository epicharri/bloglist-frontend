import React from 'react'

const SimpleBlog = ({
  blog,
  onClick
}) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <div className="nappi">
        <button onClick={onClick}>
          like
        </button>
      </div>
    </div>
  </div>
)

export default SimpleBlog
