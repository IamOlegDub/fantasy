import { Link } from 'react-router-dom';
import styles from './MyLink.module.scss';

const MyLink = ({ children, linkTo, borderColor, activeBgColor, border }) => {
    const visibleBorderColor = borderColor || 'border-indigo-600';
    const visibleActiveBgColor = activeBgColor || 'bg-indigo-800';
    const visibleBorder = border || '';
    return (
        <Link
            to={linkTo}
            className={`text-${visibleActiveBgColor.substr(
                3
            )} border active:text-inherit shadow-sm active:shadow-inner rounded-md px-3.5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${visibleActiveBgColor.substr(
                3
            )} ${visibleBorderColor} active:${visibleActiveBgColor} ${visibleBorder}`}
        >
            {children}
        </Link>
    );
};

export default MyLink;
