import ReactDOM from 'react-dom';
import styles from './PlayerCard.module.scss';
import ImageWithFallback from '../ImageWithFallback';
import { getShortPosName } from '../../positions';
import { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const PlayerCard = ({ onClose, player }) => {
    const playerCardRef = useRef();

    useOutsideClick(playerCardRef, onClose);
    return (
        <div
            ref={playerCardRef}
            className='fixed top-1/2 -translate-y-1/2 left-2 right-2 z-50 p-2 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'
        >
            <ImageWithFallback
                src={player.player_image}
                fallbackSrc='imgs/footballer-ava.jpg'
                alt=''
            />
            <div className='p-2'>
                <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
                    {player.player_name}
                </h5>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    T-shirt number - {player.player_number}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Position - {getShortPosName(player.player_type)}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Age - {player.player_age}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Matches - {player.player_match_played}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Goals - {player.player_goals}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Penalties - {player.player_pen_scored}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Impact efficiency -{' '}
                    {(
                        (player.player_pen_scored / player.player_shots_total) *
                        100
                    ).toFixed(2)}
                    %
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Assists - {player.player_assists}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Passes accuracy -{' '}
                    {(
                        (player.player_passes_accuracy / player.player_passes) *
                        100
                    ).toFixed(2)}
                    %
                </p>
                {getShortPosName(player.player_type) === 'GK' && (
                    <>
                        <p className='text-base text-neutral-600 dark:text-neutral-200'>
                            Saves - {player.player_saves}
                        </p>
                        <p className='text-base text-neutral-600 dark:text-neutral-200'>
                            Clearances - {player.player_clearances}
                        </p>
                    </>
                )}
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Birth - {player.player_birthdate}
                </p>
                <p className='text-base text-neutral-600 dark:text-neutral-200'>
                    Rating - {player.player_rating}
                </p>
            </div>
        </div>
    );
};

export const Modal = ({ onShowModal, player }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <PlayerCard onClose={onShowModal} player={player} />,
                document.getElementById('playerCard')
            )}
        </>
    );
};
