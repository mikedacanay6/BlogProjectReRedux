// App.tsx
import { Routes, Route } from 'react-router-dom';
import AllBlogs from './pages/AllBlogs';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store';
import { useEffect } from 'react';
import { fetchUser } from './app/authSlice';
import NavBar from './components/NavBar';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className=''>
      <NavBar />
      <div className='p-6'>
        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
