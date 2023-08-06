import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../slices/userSlice';
import Button from '../Button/Button';

const LogOutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(
            removeUser({
                user: null,
            })
        );
        navigate('/');
    };
    return (
        <Button
            bgColor='bg-pink-600'
            activeBgColor='bg-pink-700'
            handleClick={handleLogOut}
        >
            Log out
        </Button>
    );
};

export default LogOutButton;
