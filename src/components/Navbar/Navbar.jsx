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
import { setAllPlayers } from '../../slices/playersSlice';
import MyLink from '../MyLink/MyLink';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isSignedIn);

    const auth = getAuth();
    const selectedPlayers = useSelector(
        (state) => state.players.selectedPlayers
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((data) => {
                dispatch(setUser(data.user));
                navigate('/cabinet');
            })
            .catch((error) => console.error(error));
    };
    const handleCreateTeam = (selectedPlayers) => {};
    return (
        <header className='fixed inset-x-0 top-0 z-50 bg-gray-100 shadow-md'>
            <nav
                className='flex items-center justify-between p-6 lg:px-8'
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
                {/* <div className='hidden lg:flex lg:gap-x-12'>
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className='text-sm font-semibold leading-6 text-gray-900'
                            >
                                {item.name}
                            </a>
                        ))}
                    </div> */}
                <MyLink
                    linkTo='/cabinet'
                    borderColor='border-rose-600 text-rose-600 border-2'
                >
                    Check my team
                </MyLink>
                <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                    {!isLoggedIn ? (
                        <button
                            onClick={() => handleLogin()}
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            Log in <span aria-hidden='true'>&rarr;</span>
                        </button>
                    ) : (
                        <LogOutButton />
                    )}
                </div>
            </nav>
            <Dialog
                as='div'
                className='lg:hidden'
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className='fixed inset-0 z-50' />
                <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between'>
                        <Link href='#' className='-m-1.5 p-1.5'>
                            <span className='sr-only'>Football Fantasy</span>
                            <img
                                className='h-8 w-auto'
                                src='https://www.espn.com/graphics/2016/1014/fantasy-soccer@2x.png'
                                alt=''
                            />
                        </Link>
                        <button
                            type='button'
                            className='-m-2.5 rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            {/* <div className='space-y-2 py-6'>
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div> */}
                            <div className='py-6'>
                                {!isLoggedIn ? (
                                    <button
                                        onClick={() => handleLogin()}
                                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                    >
                                        Log in fast
                                    </button>
                                ) : (
                                    <LogOutButton />
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Navbar;
