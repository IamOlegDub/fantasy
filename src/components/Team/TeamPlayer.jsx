import React from 'react';
import ImageWithFallback from '../ImageWithFallback';

export default function TeamPlayer({ player, getPosition, i, borderColor }) {
    return (
        <div
            key={player.player_id}
            className={`absolute ${getPosition(
                player.player_type,
                i
            )} flex flex-col items-center`}
        >
            <div className='w-14'>
                <ImageWithFallback
                    borderColor={borderColor}
                    src={player.player_image}
                    fallbackSrc='imgs/footballer-ava.jpg'
                    alt=''
                />
            </div>
            <span>{player.player_name}</span>
        </div>
    );
}
