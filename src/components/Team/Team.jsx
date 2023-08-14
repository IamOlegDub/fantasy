import {
    DF,
    DF_COLOR,
    FW,
    FW_COLOR,
    GK,
    GK_COLOR,
    MF,
    MF_COLOR,
} from '../../consts';
import TeamPlayer from './TeamPlayer';

const Team = ({ currentTeam }) => {
    const form343 = {
        goalkeeperPosition: [
            'bottom-0 left-1/2 -translate-x-1/2',
            '-bottom-24 left-0',
        ],
        defenderPositions: [
            'bottom-24 left-1/4 -translate-x-1/2',
            'bottom-24 left-2/4 -translate-x-1/2',
            'bottom-24 left-3/4 -translate-x-1/2',
            '-bottom-24 left-1/3 -translate-x-1/3',
            '-bottom-24 left-2/3 -translate-x-2/4',
        ],
        midfielderPositions: [
            'bottom-80 left-1/4 -translate-x-1/2',
            'bottom-80 left-3/4 -translate-x-1/2',
            'bottom-56 left-1/3 -translate-x-1/2',
            'bottom-56 left-2/3 -translate-x-1/2',
            '-bottom-24 right-0 translate-x-1/4',
        ],
        forwardPositions: [
            'top-10 left-1/4 -translate-x-1/2',
            'top-10 left-2/4 -translate-x-1/2',
            'top-10 left-3/4 -translate-x-1/2',
        ],
    };

    const getPosition = (type, i) => {
        switch (type) {
            case GK:
                return form343.goalkeeperPosition[i];
            case DF:
                return form343.defenderPositions[i];
            case MF:
                return form343.midfielderPositions[i];
            case FW:
                return form343.forwardPositions[i];
            default:
                return {};
        }
    };

    const goalkeepers = currentTeam.filter(
        (teammate) => teammate.player_type === GK
    );
    const defenders = currentTeam.filter(
        (teammate) => teammate.player_type === DF
    );
    const midfielders = currentTeam.filter(
        (teammate) => teammate.player_type === MF
    );
    const forwards = currentTeam.filter(
        (teammate) => teammate.player_type === FW
    );

    return (
        <div className='relative mx-auto'>
            <img className='mx-auto' src='imgs/Football_field.png' alt='' />
            {goalkeepers.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-${GK_COLOR}`}
                />
            ))}
            {defenders.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-${DF_COLOR}`}
                />
            ))}
            {midfielders.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-${MF_COLOR}`}
                />
            ))}
            {forwards.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-${FW_COLOR}`}
                />
            ))}
        </div>
    );
};

export default Team;
