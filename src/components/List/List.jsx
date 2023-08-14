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
    const [sortedAllPlayers, setSortedAllPlayers] = useState('All');
    const [isFilterPositionsShown, setIsFilterPositionsShown] = useState(false);
    const [isFilterTeamsShown, setIsFilterTeamsShown] = useState(false);
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

    const sortObjectsByKey = (objects, key) =>
        objects.slice().sort((a, b) => b[key] - a[key]);

    const sortedAllPlayerss = sortObjectsByKey(allPlayers, 'player_rating');

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
        sortedAllPlayerss,
        'player_type',
        activeListItem
    );
    const filteredAllPlayersByTeams = filterAllPlayers(
        filteredAllPlayersByPositions,
        'team_name',
        activeTeamItem
    );

    return (
        <div className='container mx-auto'>
            <div className='flex gap-2'>
                <FilterPlayersButton
                    refItem={positionsRef}
                    toggleFilterItems={toggleFilterPositions}
                    activeItem={activeListItem}
                    isFilterItemsShown={isFilterPositionsShown}
                    filterItems={positions}
                    filterList={filterPositionsList}
                />
                <FilterPlayersButton
                    refItem={teamsRef}
                    toggleFilterItems={toggleFilterTeams}
                    activeItem={activeTeamItem}
                    isFilterItemsShown={isFilterTeamsShown}
                    filterItems={fullTeams.map((team) => team.team_name)}
                    filterList={filterTeamsList}
                />
                <div>Rating</div>
                <div>Position</div>
                <div>Name</div>
                <div>Team</div>
                <div>Goals</div>
                <div>Points</div>
            </div>

            <div className='flex flex-col gap-2'>
                {filteredAllPlayersByTeams.map((player) => (
                    //елемент списку футболістів
                    <PlayerListItem key={player.player_id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default List;
