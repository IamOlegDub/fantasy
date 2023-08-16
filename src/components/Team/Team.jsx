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
import { formations } from '../../formations';
import TeamPlayer from './TeamPlayer';

const Team = ({ currentTeam, activeFormation }) => {
    const getPosition = (type, i) => {
        switch (type) {
            case GK:
                return activeFormation.goalkeeperPosition[i];
            case DF:
                return activeFormation.defenderPositions[i];
            case MF:
                return activeFormation.midfielderPositions[i];
            case FW:
                return activeFormation.forwardPositions[i];
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
        <div className='relative mx-auto text-xs'>
            <img className='mx-auto' src='imgs/Football_field.png' alt='' />
            {goalkeepers.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#ff9f43]`}
                />
            ))}
            {defenders.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#74b9ff]`}
                />
            ))}
            {midfielders.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#55efc4]`}
                />
            ))}
            {forwards.map((player, i) => (
                <TeamPlayer
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#ee5253]`}
                />
            ))}
        </div>
    );
};

export default Team;
