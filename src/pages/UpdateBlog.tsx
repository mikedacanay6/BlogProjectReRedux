import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { updateBlog } from '../app/blogSlice';

const UpdateBlog = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const blog = useSelector((state: RootState) => state.blog.blogs.find((b) => b.id === Number(id)))
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async () => {
    const blogData = {
      id: Number(id),
      title: title,
      content: content,
      user_id: user.id,
      madeBy: user.email
    }

    try {
      await dispatch(updateBlog(blogData))
      navigate('/')
    } catch (error) {
      console.log(error)
      return
    }

  }

  useEffect(() => {
    if(blog) {
      setTitle(blog.title)
      setContent(blog.content)
    }
  }, [blog])

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Update Blog</h1>
        <Link to={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Home</Link>
      </div>

      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}} className='flex flex-col my-6 relative'>
        <input value={title} type="text" className='border border-gray-500 rounded p-2 m-2' placeholder='Title' required onChange={(e) => setTitle(e.target.value)}/>
        <textarea
        value={content}
          className="border border-gray-500 rounded p-2 m-2 h-[200px] resize-none"
          placeholder="Content"
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute -bottom-11 right-2'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateBlog