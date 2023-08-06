import { useSelector } from 'react-redux';
import styles from './Cabinet.module.scss';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import MyLink from '../MyLink/MyLink';
import Team from '../Team/Team';

const Cabinet = () => {
    const currentUser = useSelector((state) => state.user.user);
    const currentTeam = useSelector((state) => state.players.selectedPlayers);
    console.log(currentTeam);

    return (
        <div className='flex flex-row gap-10'>
            <div className='flex flex-col items-center gap-5 flex-grow'>
                <span>{currentUser.displayName}, welcome in a cabinet!</span>
                <div>
                    <img
                        className='rounded-full w-10'
                        src={currentUser.photoURL}
                        alt=''
                    />
                </div>
                <div className='flex gap-5'>
                    <LogOutButton />
                    <MyLink linkTo='/list'>
                        {currentTeam.length > 0 ? 'Manage team' : 'Create team'}
                    </MyLink>
                </div>
            </div>
            <div className='flex-grow items-center flex-col'>
                <Team currentTeam={currentTeam} />
            </div>
        </div>
    );
};

export default Cabinet;
