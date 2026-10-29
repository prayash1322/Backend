import Nav from "../components/Nav"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    await axios.post("http://localhost:3000/create-post", formData)
    .then((res) => {
      alert("Post Created Successfully")
      navigate("/feed")
      e.target.reset()

    }) 
    .catch((err) => {
      console.log(err);
      alert("Something Went Wrong")
    })
  }

  return (
    <section className="create-post-section">
      {<Nav/>}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" />
        <input type="text" placeholder="Enter a Caption" name="caption" required />
        <button type="submit">Create Post</button>
      </form>
    </section>
  )
}

export default CreatePost
