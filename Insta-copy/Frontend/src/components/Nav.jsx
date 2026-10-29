import { Link } from "react-router-dom"
const Nav = () => {
  return (
    <div className="home-container">
      <nav>
        <Link to="/create-post">Create Post</Link>
        <Link to="/feed">View Posts</Link>
      </nav>
    </div>
  )
}

export default Nav
