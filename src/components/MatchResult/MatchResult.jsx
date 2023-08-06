import styles from './MatchResult.module.scss';
import Events from './Events';

const MatchResult = ({ match }) => {
    const goalAndCardEvents = [...match.goalscorer, ...match.cards];
    goalAndCardEvents.forEach((event) => {
        if (event.time.length > 2) {
            const first = Number(event.time[0] + event.time[1]);
            event.sortTime = first + Number(event.time.substr(3));
        } else {
            event.sortTime = event.time;
        }
        event.id = event.time + Math.random();
    });
    goalAndCardEvents.sort((a, b) => Number(a.sortTime) - Number(b.sortTime));
    return (
        <div
            key={match.match_id}
            className='py-5 px-8 bg-indigo-200 rounded-xl'
        >
            <div className='flex flex-row justify-around gap-4 mb-2'>
                <div className='flex-1 flex justify-end gap-2'>
                    <div className=''>{match.match_hometeam_name}</div>
                    <div className='w-6 flex items-center'>
                        <img src={match.team_home_badge} alt='' />
                    </div>
                </div>
                <div className='flex-1 max-w-[40px]'>
                    {match.match_hometeam_score}-{match.match_awayteam_score}
                </div>
                <div className='flex-1 flex justify-start gap-2'>
                    <div className='w-6 flex items-center'>
                        <img src={match.team_away_badge} alt='' />
                    </div>
                    <div className=''>{match.match_awayteam_name}</div>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-28 text-xs'>
                <div className='max-w-[50%] flex-1'>
                    {goalAndCardEvents.length > 0 &&
                        goalAndCardEvents.map((event) => (
                            <Events key={event.id} event={event} place='home' />
                        ))}
                </div>
                <div className='max-w-[50%] flex-1'>
                    {goalAndCardEvents.length > 0 &&
                        goalAndCardEvents.map((event) => (
                            <Events key={event.id} event={event} place='away' />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MatchResult;
