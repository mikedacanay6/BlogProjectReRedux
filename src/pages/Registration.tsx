import React, { useState } from 'react'
import supaBase from '../supabase-client';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(signUp({ email, password, name }));
            navigate('/login');
            setEmail('');
            setPassword('');
        } catch (error) {
            const err = error as Error;
            console.log(err.message);
            alert(err.message);
        }
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='shadow-2xl w-[400px] h-[auto] rounded-2xl p-10 flex flex-col justify-center'>
            <h1 className='text-3xl font-medium '>Registration</h1>

            <form onSubmit={handleRegister} className='flex flex-col gap-4 mt-4'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='border border-gray-400 w-full p-2 rounded-xl shadow-xl' required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='border border-gray-400 w-full p-2 rounded-xl shadow-xl' required/>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' className='border border-gray-400 w-full p-2 rounded-xl shadow-xl' required/>

                <button type='submit' className='bg-blue-600 text-white p-2 rounded-xl shadow-xl cursor-pointer'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Registration