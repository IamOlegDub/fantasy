import { useEffect, useState } from 'react';
import styles from './List.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPlayer,
    removePlayer,
    setAllPlayers,
} from '../../slices/playersSlice';
import { useRef } from 'react';
import ImageWithFallback from '../ImageWithFallback';
import Button from '../Button/Button';
import { getItemColor, getShortPosName } from '../../positions';

const List = () => {
    const [activeList, setActiveList] = useState('ALL');
    const APIKey =
        '4e693d4b1cd178bbce0f703b71978666e0539c708a9638dde4612f930ee1b611';
    const url = 'https://apiv3.apifootball.com/?action=';
    const query = 'get_teams&league_id=152&';

    const dispatch = useDispatch();

    const getList = async () => {
        try {
            const res = await axios.get(`${url}${query}APIkey=${APIKey}`);
            dispatch(setAllPlayers(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const allPlayers = useSelector((state) => state.players.allPlayers);

    const selectedPlayers = useSelector(
        (state) => state.players.selectedPlayers
    );

    const positions = ['GK', 'DF', 'MF', 'FW', 'ALL'];

    const filterList = (position) => {
        setActiveList(position);
    };

    const handleAddPlayer = (player) => {
        dispatch(addPlayer(player));
    };

    const handleRemovePlayer = (playerId) => {
        dispatch(removePlayer(playerId));
    };

    const isPlayerSelected = (playerId) => {
        return selectedPlayers.some((player) => player.player_id === playerId);
    };

    return (
        <div className='container mx-auto'>
            <div className='flex gap-10 p-5'>
                {positions.map((position) => (
                    <div
                        key={position}
                        className='cursor-pointer'
                        onClick={() => filterList(position)}
                    >
                        {position}
                    </div>
                ))}
            </div>
            <div className={styles.list}>
                {allPlayers.map((item) => (
                    <div key={item.team_key}>
                        <div>
                            {item.players
                                .filter((player) => {
                                    if (activeList === 'ALL') {
                                        return player;
                                    }
                                    return (
                                        getShortPosName(player.player_type) ===
                                        activeList
                                    );
                                })
                                .map((player) => (
                                    //елемент списку футболістів
                                    <div
                                        key={player.player_id}
                                        className={`flex flex-row py-2 px-8 items-center ${getItemColor(
                                            player.player_type
                                        )} my-2 gap-3 relative rounded-md`}
                                    >
                                        <div className='w-8 basis-1/12'>
                                            <img
                                                src={item.team_badge}
                                                alt='logo'
                                            />
                                        </div>
                                        <div className='font-bold basis-1/12'>
                                            {getShortPosName(
                                                player.player_type
                                            )}
                                        </div>
                                        <div className='w-8 basis-1/12 cursor-pointer'>
                                            <ImageWithFallback
                                                src={player.player_image}
                                                fallbackSrc='imgs/footballer-ava.jpg'
                                                alt=''
                                            />
                                            {/* <img
                                                
                                                src={player.player_image}
                                                alt=''
                                            /> */}
                                        </div>
                                        <div className='font-medium basis-3/12 text-start'>
                                            {player.player_name}
                                        </div>
                                        <div className='italic basis-1/12'>
                                            {player.player_rating}
                                        </div>
                                        <div className='italic basis-1/12'>
                                            G:{player.player_goals || 0}
                                        </div>
                                        <div className='italic basis-1/12'>
                                            A:{player.player_assists || 0}
                                        </div>
                                        <div className='italic basis-1/12'>
                                            {player.player_type ===
                                                'Goalkeepers' &&
                                                'S:' +
                                                    (player.player_saves || 0)}
                                        </div>
                                        <div className='basis-2/12 text-end text-xs'>
                                            {item.team_name}
                                        </div>
                                        {!isPlayerSelected(player.player_id) ? (
                                            <Button
                                                bgColor='bg-emerald-600'
                                                activeBgColor='bg-emerald-700'
                                                handleClick={() =>
                                                    handleAddPlayer(player)
                                                }
                                            >
                                                Add
                                            </Button>
                                        ) : (
                                            <Button
                                                bgColor='bg-rose-600'
                                                activeBgColor='bg-rose-700'
                                                handleClick={() =>
                                                    handleRemovePlayer(
                                                        player.player_id
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
