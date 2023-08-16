import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';

const BottomBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isSignedIn);

    const handleCloseMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className='fixed bottom-0 p2 w-full flex bg-slate-50 z-50 shadow-up rounded-t-md lg:max-w-md lg:left-1/2 lg:-translate-x-1/2'>
                <nav className='flex justify-evenly w-full'>
                    <Link to='/' className='p-2'>
                        Team
                    </Link>
                    <Link to='/list' className='p-2'>
                        Players
                    </Link>
                    <Link to='' className='p-2'>
                        Competitors
                    </Link>
                </nav>
                <div className='p-2 pr-5 flex justify-end'>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
            </header>
            {mobileMenuOpen && (
                <Menu onCloseMenu={handleCloseMenu} isLoggedIn={isLoggedIn} />
            )}
        </>
    );
};

export default BottomBar;
