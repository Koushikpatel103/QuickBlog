import { Route, Routes } from 'react-router-dom';
import Blog from './Pages/Blog';
import Home from './Pages/Home';
import Layout from './Pages/admin/Layout';
import Dashboard from './Pages/admin/Dashboard';
import AddBlog from './Pages/admin/AddBlog';
import ListBlogs from './Pages/admin/ListBlogs';
import Comment from './Pages/admin/Comment';
import Login from './Components/admin/Login';
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContest';

function App() {
  const { token } = useAppContext(); // ✅ call the hook

  return (
    <div>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        <Route
          path="/admin"
          element={token ? <Layout /> : <Login />}
        >
          <Route index element={<Dashboard />} />
          <Route path="ListBlogs" element={<ListBlogs />} />
          <Route path="AddBlog" element={<AddBlog />} />
          <Route path="Comment" element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;