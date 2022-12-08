import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import CreatePost from "./screens/create/CreatePost";
import PostDetails from "./screens/postdetails/PostDetails";
import EditPost from "./screens/edit/EditPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
