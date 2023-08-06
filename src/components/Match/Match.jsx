import { useEffect, useState } from 'react';
import styles from './Match.module.scss';
import axios from 'axios';
import MatchResult from '../MatchResult/MatchResult';

const Match = () => {
    const [matches, setMatches] = useState([]);
    const APIKey =
        '4e693d4b1cd178bbce0f703b71978666e0539c708a9638dde4612f930ee1b611';
    const url = 'https://apiv3.apifootball.com/?action=';
    const query = 'get_events&from=2022-11-19&to=2022-12-25&league_id=28&';
    const query2 = 'get_leagues';

    useEffect(() => {
        axios
            .get(`${url}${query}APIkey=${APIKey}`)
            .then((res) => {
                setMatches(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(matches);
    if (matches.length === 0) <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-6 my-5 mx-10'>
            {matches.length > 0 &&
                matches.map((match) => (
                    <MatchResult key={match.match_id} match={match} />
                ))}
        </div>
    );
};

export default Match;
