import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './List.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPlayers } from '../../slices/playersSlice';
import { getShortPosName } from '../../positions';
import PlayerListItem from '../PlayerListItem/PlayerListItem';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import FilterPlayersButton from '../FilterPlayersButton/FilterPlayersButton';

const List = () => {
    const [activeListItem, setActiveListItem] = useState('All');
    const [activeTeamItem, setActiveTeamItem] = useState('All');
    const [allPlayersSortingType, setAllPlayersSortingType] =
        useState('team_name');
    const [isSortingByString, setIsSortingByString] = useState(false);
    const [isFilterPositionsShown, setIsFilterPositionsShown] = useState(false);
    const [isFilterTeamsShown, setIsFilterTeamsShown] = useState(false);
    const [trueDirection, setTrueDirection] = useState(true);
    const APIKey =
        '4e693d4b1cd178bbce0f703b71978666e0539c708a9638dde4612f930ee1b611';
    const url = 'https://apiv3.apifootball.com/?action=';
    const query = 'get_teams&league_id=152&';

    const positionsRef = useRef();
    const teamsRef = useRef();

    const fullTeams = useSelector((state) => state.players.fullTeams);

    const dispatch = useDispatch();

    const getList = useCallback(async () => {
        try {
            const res = await axios.get(`${url}${query}APIkey=${APIKey}`);
            dispatch(setAllPlayers(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getList();
    }, [getList]);

    const allPlayers = useSelector((state) => state.players.allPlayers);

    const positions = ['GK', 'DF', 'MF', 'FW'];

    const filterPositionsList = (position) => {
        setActiveListItem(position);
        toggleFilterPositions();
    };
    const filterTeamsList = (team) => {
        setActiveTeamItem(team);
        toggleFilterTeams();
    };

    const sortObjectsByKey = (objects, key, isSortByString, trueDirection) =>
        objects.slice().sort((a, b) => {
            if (!isSortByString) {
                return trueDirection ? b[key] - a[key] : a[key] - b[key];
            } else {
                if (a[key] < b[key]) return trueDirection ? -1 : 1;
                if (a[key] > b[key]) return trueDirection ? 1 : -1;
                return 0;
            }
        });

    const sortedAllPlayers = sortObjectsByKey(
        allPlayers,
        allPlayersSortingType,
        isSortingByString,
        trueDirection
    );
    console.log(isSortingByString);

    const toggleFilterPositions = () => {
        setIsFilterPositionsShown((prev) => !prev);
    };
    const toggleFilterTeams = () => {
        setIsFilterTeamsShown((prev) => !prev);
    };

    useOutsideClick(positionsRef, () => {
        setIsFilterPositionsShown(false);
    });
    useOutsideClick(teamsRef, () => {
        setIsFilterTeamsShown(false);
    });

    const filterAllPlayers = (objects, key, filteringItem) => {
        return objects.filter((object) => {
            if (filteringItem !== 'All') {
                return getShortPosName(object[key]) === filteringItem;
            }
            return objects;
        });
    };

    const filteredAllPlayersByPositions = filterAllPlayers(
        sortedAllPlayers,
        'player_type',
        activeListItem
    );
    const filteredAllPlayersByTeams = filterAllPlayers(
        filteredAllPlayersByPositions,
        'team_name',
        activeTeamItem
    );

    const handleSortPlayers = (type, isString) => {
        setAllPlayersSortingType(type);
        setIsSortingByString(isString);
        if (type === allPlayersSortingType) {
            setTrueDirection((prev) => !prev);
        } else {
            setTrueDirection(true);
        }
    };

    return (
        <div className='container mx-auto '>
            <div className='flex flex-col gap-2 fixed top-1 left-1/2 -translate-x-1/2 z-50 rounded-md shadow-md p-3 bg-slate-50'>
                <div className='flex gap-1 text-xs items-center'>
                    <p className='text-sm'>Filter by position: </p>
                    <FilterPlayersButton
                        refItem={positionsRef}
                        toggleFilterItems={toggleFilterPositions}
                        activeItem={activeListItem}
                        isFilterItemsShown={isFilterPositionsShown}
                        filterItems={positions}
                        filterList={filterPositionsList}
                    />
                    <p className='ml-2 text-sm'>Filter by team: </p>
                    <FilterPlayersButton
                        refItem={teamsRef}
                        toggleFilterItems={toggleFilterTeams}
                        activeItem={activeTeamItem}
                        isFilterItemsShown={isFilterTeamsShown}
                        filterItems={fullTeams.map((team) => team.team_name)}
                        filterList={filterTeamsList}
                    />
                </div>
                <div className='flex gap-1 text-xs'>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() =>
                            handleSortPlayers('player_rating', false)
                        }
                    >
                        Rate
                        {allPlayersSortingType === 'player_rating' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_type', true)}
                    >
                        Pos
                        {allPlayersSortingType === 'player_type' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_name', true)}
                    >
                        Name
                        {allPlayersSortingType === 'player_name' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('team_name', true)}
                    >
                        Team
                        {allPlayersSortingType === 'team_name' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_goals', false)}
                    >
                        Goals
                        {allPlayersSortingType === 'player_goals' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() =>
                            handleSortPlayers('player_assists', false)
                        }
                    >
                        Assists
                        {allPlayersSortingType === 'player_assists' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => setAllPlayersSortingType('')}
                    >
                        Points
                        {allPlayersSortingType === '' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-2 mt-28'>
                {filteredAllPlayersByTeams.map((player) => (
                    //елемент списку футболістів
                    <PlayerListItem key={player.player_id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default List;
