import React from 'react';
import { ReactComponent as BallIcon } from './ballIcon.svg';
import { ReactComponent as AssistIcon } from './assistIcon.svg';

export default function Events({ event, place }) {
    const cardType =
        event.card === 'yellow card' ? 'bg-yellow-300' : 'bg-red-600';
    return (
        <div
            className={`flex gap-2 justify-end ${
                place === 'away' && 'flex-row-reverse'
            }`}
        >
            {event[`${place}_assist`] && (
                <div className='flex text-stone-500'>
                    (
                    <div className='w-2 mt-1 mr-1'>
                        <AssistIcon />
                    </div>
                    {`${event[`${place}_assist`]}`})
                </div>
            )}

            <div className='flex gap-1'>
                {event[`${place}_fault`] && (
                    <div className={`w-2 h-3 ${cardType}`}></div>
                )}
                {event[`${place}_scorer`] && (
                    <div className='w-2 h-2 mt-1'>
                        <BallIcon />
                    </div>
                )}
                {event[`${place}_fault`] && event[`${place}_fault`]}
                {event[`${place}_scorer`] && event[`${place}_scorer`]}
            </div>
            <div>
                {event[`${place}_fault`] && event.time + "'"}
                {event[`${place}_scorer`] && event.time + "'"}
            </div>
        </div>
    );
}
