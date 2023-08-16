import { useSelector } from 'react-redux';
import styles from './Cabinet.module.scss';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import MyLink from '../MyLink/MyLink';
import Team from '../Team/Team';
import { formations } from '../../formations';
import { useState } from 'react';

const Cabinet = () => {
    const [activeFormation, setActiveFormation] = useState(formations[0]);
    const currentTeam = useSelector((state) => state.players.selectedPlayers);
    console.log(currentTeam);

    const handleChangeFormation = (i) => {
        setActiveFormation(formations[i]);
    };

    return (
        <div className='flex flex-row gap-10 '>
            <div className='flex-grow items-center flex-col justify-center'>
                <Team
                    currentTeam={currentTeam}
                    activeFormation={activeFormation}
                />
                <div className='flex flex-col items-center gap-5 flex-grow relative'>
                    <div className='flex gap-2 mt-32'>
                        {formations.map((formation, i) => (
                            <div
                                key={formation.name}
                                className={`border p-1 rounded-md ${
                                    formation.name === activeFormation.name &&
                                    'bg-violet-400'
                                }`}
                                onClick={() => handleChangeFormation(i)}
                            >
                                {formation.name}
                            </div>
                        ))}
                    </div>
                    <MyLink linkTo='/list'>
                        {currentTeam.length > 0 ? 'Manage team' : 'Create team'}
                    </MyLink>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
