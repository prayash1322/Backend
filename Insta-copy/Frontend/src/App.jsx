import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import ViewPosts from './pages/ViewPosts'
import Nav from './components/Nav'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Nav />}></Route>
        <Route path='/create-post' element={<CreatePost/>}></Route>
        <Route path='/feed' element={<ViewPosts/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
