import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { login } from '../app/authSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(login({  email, password })).unwrap();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='shadow-2xl w-[400px] h-[auto] rounded-2xl p-6 flex flex-col justify-center'>
            <h1 className='text-3xl font-medium '>Login</h1>

            <form onSubmit={handleLogin} className='flex flex-col gap-4 mt-4'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='border border-gray-400 w-full p-2 rounded-xl shadow-xl' required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='border border-gray-400 w-full p-2 rounded-xl shadow-xl' required/>

                <button className='bg-blue-600 text-white p-2 rounded-xl shadow-xl cursor-pointer'>Login</button>
            </form>

            <div className='flex items-center gap-4 mt-4'>
                <div className='border-t border-gray-400 w-[200px]'></div>
                <div className='text-gray-400'>or</div>
                <div className='border-t border-gray-400 w-[200px]'></div>
            </div>

            <div className='text-center'>
                <p>Don't have an account? <Link to="/register" className='text-blue-600'>Register</Link></p>
                <p>Enter as a <Link to="/" className='text-blue-600'>Guest</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login