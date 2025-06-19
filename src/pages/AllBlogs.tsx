import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../app/blogSlice';

const AllBlogs = () => {
    const blogs = useSelector((state: RootState) => state.blog.blogs)
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch<AppDispatch>()

    const [ currentPage, setCurrentPage ] = useState(1)
    const blogsPerPage = 5

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    const handleDeleteBlog = (id: number) => {
        dispatch(deleteBlog(id))
    }

  return (
    <div>
        <div className='flex justify-between'>
            
        </div>

      {/* Render your list of blogs here */}
      <div className="mt-4">
        {
            currentBlogs.map((blog) => {
                return (
                    <div key={blog.id} className="mb-4 p-4 rounded-xl items-center relative shadow-xl min-h-[200px] border border-gray-400">
                        <div className='w-[80%]'>
                            <h3 className="text-2xl font-bold">{blog.title}</h3>
                            <p>{blog.content}</p>
                            <p className='absolute bottom-3 right-3'>by {blog.madeBy}</p>
                        </div>

                        {
                            user?.id === blog.user_id && (
                                <div className='flex gap-2 absolute top-5 right-3'>
                                    <Link to={`/update/${blog.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'>Edit</Link>
                                    <button onClick={() => handleDeleteBlog(blog.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'>Delete</button>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }

        <div className="flex justify-center items-center mt-6 gap-2">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
                Prev
            </button>
            <span className="font-semibold text-lg">Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
