import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addBlog } from '../app/blogSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { useSelector } from 'react-redux'

const CreateBlog = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const user = useSelector((state: RootState) => state.auth.user)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = async() => {

    if(!title || !content) {
      alert('Title and content are required')
      return
    }

    const blogData = {
      title: title,
      content: content,
      user_id: user?.id,
      madeBy: user?.email
    }

    try {
      await dispatch(addBlog(blogData))
      setTitle('')
      setContent('')
      navigate('/')
    } catch (error) {
      console.log(error)
      return
    }

  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Create Blog</h1>
        <Link to={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Home</Link>
      </div>

      <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}} className='flex flex-col my-6 relative'>
        <input type="text" className='border border-gray-500 rounded p-2 m-2' placeholder='Title' required onChange={(e) => setTitle(e.target.value)}/>
        <textarea
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

export default CreateBlog