import { useSelector } from 'react-redux';
import styles from './Cabinet.module.scss';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import MyLink from '../MyLink/MyLink';
import Team from '../Team/Team';

const Cabinet = () => {
    const currentTeam = useSelector((state) => state.players.selectedPlayers);
    console.log(currentTeam);

    return (
        <div className='flex flex-row gap-10 '>
            <div className='flex-grow items-center flex-col justify-center'>
                <Team currentTeam={currentTeam} />
                <div className='flex flex-col items-center gap-5 flex-grow relative'>
                    <div className='flex gap-5 mt-32'>
                        <MyLink linkTo='/list'>
                            {currentTeam.length > 0
                                ? 'Manage team'
                                : 'Create team'}
                        </MyLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
