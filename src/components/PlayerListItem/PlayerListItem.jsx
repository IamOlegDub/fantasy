import { useDispatch, useSelector } from 'react-redux';
import { getItemColor, getShortPosName, getTextColor } from '../../positions';
import { addPlayer, removePlayer } from '../../slices/playersSlice';
import ImageWithFallback from '../ImageWithFallback';
import Button from '../Button/Button';
import { Modal } from '../PlayerCard/PlayerCard';
import { useState } from 'react';

const PlayerListItem = ({ player }) => {
    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => {
        setShowModal(!showModal);
    };

    const dispatch = useDispatch();

    const bgItemListColor = getItemColor(player.player_type);
    const fontItemListColor = getTextColor(player.player_type);

    const handleAddPlayer = (player) => {
        dispatch(addPlayer(player));
    };

    const handleRemovePlayer = (playerId) => {
        dispatch(removePlayer(playerId));
    };
    const selectedPlayers = useSelector(
        (state) => state.players.selectedPlayers
    );
    const isPlayerSelected = (playerId) => {
        return selectedPlayers.some((player) => player.player_id === playerId);
    };
    return (
        <div
            className={`flex flex-row p-1 items-center ${bgItemListColor} gap-1 relative rounded-md border min-h-item`}
        >
            {showModal && (
                <Modal
                    showModal={showModal}
                    onShowModal={onShowModal}
                    player={player}
                />
            )}
            <div className='w-8 basis-1/12'>
                <img src={player.team_badge} alt='logo' />
            </div>
            <div
                className={`font-bold basis-1/12 text-xs ${fontItemListColor}`}
            >
                {getShortPosName(player.player_type)}
            </div>
            <div className='w-8 basis-1/12 cursor-pointer'>
                <ImageWithFallback
                    src={player.player_image}
                    fallbackSrc='imgs/footballer-ava.jpg'
                    alt=''
                />
            </div>
            <div
                onClick={onShowModal}
                className='font-medium basis-2/12 text-start text-xs'
            >
                {player.player_name}
            </div>
            <div className='italic basis-1/12 text-xs'>
                {player.player_rating}
            </div>
            <div className='italic basis-1/12 text-xs'>
                G:{player.player_goals || 0}
            </div>
            <div className='italic basis-1/12 text-xs'>
                A:{player.player_assists || 0}
            </div>
            <div className='italic basis-1/12 text-xs'>
                {player.player_type === 'Goalkeepers' &&
                    'S:' + (player.player_saves || 0)}
            </div>
            <div className='basis-1/12 text-end text-xs'>
                {player.team_name}
            </div>
            <div className='basis-1/12 text-xs '>
                {!isPlayerSelected(player.player_id) ? (
                    <Button
                        bgColor='bg-[#6c5ce7]'
                        activeBgColor='bg-violet-700 text-xs w-button h-button text-white'
                        handleClick={() => handleAddPlayer(player)}
                    >
                        +
                    </Button>
                ) : (
                    <Button
                        bgColor='bg-slate-50'
                        activeBgColor='bg-rose-700 text-xs w-button h-button border-2 border-[#6c5ce7] text-[#6c5ce7] leading-3'
                        handleClick={() => handleRemovePlayer(player.player_id)}
                    >
                        x
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PlayerListItem;
