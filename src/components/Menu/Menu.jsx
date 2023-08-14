import { XMarkIcon } from '@heroicons/react/24/outline';
import styles from './Menu.module.scss';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Menu = ({ onCloseMenu }) => {
    const menuRef = useRef();

    useOutsideClick(menuRef, onCloseMenu);
    return (
        <div
            ref={menuRef}
            className='fixed top-0 left-0 w-2/3 flex h-screen bg-slate-50 flex-col p-2 justify-between z-50 lg:max-w-xs lg:left-1/2 lg:-translate-x-2/3'
        >
            <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 self-start'
                onClick={() => onCloseMenu()}
            >
                <span className='sr-only'>Open main menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div></div>

            <LogOutButton onCloseMenu={onCloseMenu} />
        </div>
    );
};

export default Menu;
