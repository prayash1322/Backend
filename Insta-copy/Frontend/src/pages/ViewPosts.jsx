import {useState,useEffect} from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
const ViewPosts = () => {

  const [posts, setPosts] = useState([{
    _id:"1",
    image:"https://images.unsplash.com/photo-1789845839410-006feccb1357?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption:"Beautiful Scenery"
  }])

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
    .then((res) => {
      setPosts(res.data.posts)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])
  return (
    <section className="feed-section">
      {<Nav/>}
      <h1>Feed</h1>
      {
        posts.length > 0 ? ( 
          posts.map((post) => (
            <div key={post._id} className="post">
              <img src={post.image} alt={post.caption} />
              <p>{post.caption}</p>
            </div>
          ))) : (
            <p>No posts available.</p>
          )

        
      }
    </section>
  )
}

export default ViewPosts
