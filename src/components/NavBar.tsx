import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { logout } from '../app/authSlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate();

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null
    }

    const links = [
        ...(user ? [{name: "Create Blog", path: "/create"}] : [])
    ]

  return (
    <div className='shadow-lg w-full h-[80px] p-6 sticky top-0 bg-white z-10'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-medium '>Blogify</h1>

                    
            {
                location.pathname !== '/create' && !location.pathname.startsWith('/update') && (
                    <div className='flex items-center'>

                        { user && (
                            <h1 className='text-lg mr-2 font-medium '>Welcome, {user?.user_metadata.first_name}</h1>
                        )}

                        {
                            user ? (
                                <div className='relative'>
                                    <button
                                        onClick={() => {dispatch(logout()); navigate('/login')}}
                                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 '
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        to='/login'
                                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                                    >
                                        Login
                                    </Link>
                                </div>
                            )
                        }

                        {
                            links.map((link) => {
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default NavBar