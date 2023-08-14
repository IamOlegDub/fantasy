import styles from './Navbar.module.scss';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { setUser } from '../../slices/userSlice';
import { googleAuthProvider } from '../../firebase';
import LogOutButton from '../LogOutButton/LogOutButton';
import MyLink from '../MyLink/MyLink';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isSignedIn);

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((data) => {
                dispatch(setUser(data.user));
                navigate('/cabinet');
            })
            .catch((error) => console.error(error));
        setMobileMenuOpen(false);
    };
    return (
        <header className='fixed inset-x-0 top-0 z-50 bg-gray-100 shadow-md'>
            <nav
                className='flex items-center justify-between p-2 lg:px-8 relative'
                aria-label='Global'
            >
                <div className='flex lg:flex-1'>
                    <Link to='/' className='-m-1.5 p-1.5'>
                        <span className='sr-only'>Football fantasy</span>
                        <img
                            className='h-8 w-auto'
                            src='https://www.espn.com/graphics/2016/1014/fantasy-soccer@2x.png'
                            alt=''
                        />
                    </Link>
                </div>
                <MyLink
                    linkTo='/cabinet'
                    borderColor='border-rose-600 text-rose-600 border-2'
                >
                    Check my team
                </MyLink>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className='absolute top-0 right-0 w-1/2 flex h-screen bg-slate-50 flex-col px-2 py-5 justify-between '>
                        <button
                            type='button'
                            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 self-end'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className='sr-only'>Open main menu</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                        <div></div>
                        {!isLoggedIn ? (
                            <button
                                onClick={() => handleLogin()}
                                className='text-sm font-semibold leading-6 text-gray-900'
                            >
                                Log in <span aria-hidden='true'>&rarr;</span>
                            </button>
                        ) : (
                            <LogOutButton onCloseMenu={setMobileMenuOpen} />
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
