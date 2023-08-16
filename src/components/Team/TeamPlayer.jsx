import React, { useState } from 'react';
import ImageWithFallback from '../ImageWithFallback';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removePlayer } from '../../slices/playersSlice';
import { useDispatch } from 'react-redux';
import { Modal } from '../PlayerCard/PlayerCard';

export default function TeamPlayer({ player, getPosition, i, borderColor }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => {
        setShowModal(!showModal);
    };

    const handleRemovePlayer = (e, playerId) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(removePlayer(playerId));
    };
    return (
        <div
            key={player.player_id}
            className={`absolute ${getPosition(
                player.player_type,
                i
            )} flex flex-col items-center`}
        >
            {showModal && (
                <Modal
                    showModal={showModal}
                    onShowModal={onShowModal}
                    player={player}
                />
            )}
            <div className='w-12 relative' onClick={() => {}}>
                <button
                    onClick={(e) => handleRemovePlayer(e, player.player_id)}
                    className=' bg-red-500 rounded-full p-1 text-slate-50 pb-1 absolute -top-2 -right-2'
                >
                    <XMarkIcon className='h-2 w-2' aria-hidden='true' />
                </button>
                <ImageWithFallback
                    onClick={() => {}}
                    borderColor={borderColor}
                    src={player.player_image}
                    fallbackSrc='imgs/footballer-ava.jpg'
                    alt=''
                />
            </div>
            <button onClick={onShowModal}>
                <p className='text-slate-800 font-bold'>{player.player_name}</p>
            </button>
        </div>
    );
}
