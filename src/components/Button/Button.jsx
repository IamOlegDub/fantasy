const Button = ({ children, handleClick, bgColor, activeBgColor, border }) => {
    const visibleBgColor = bgColor || 'bg-indigo-600';
    const visibleActiveBgColor = activeBgColor || 'bg-indigo-800';
    const visibleBorder = border || '';
    return (
        <button
            className={`active:text-inherit shadow-sm active:shadow-inner rounded-md  px-3.5 py-2.5 text-sm font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${visibleBgColor.substr(
                3
            )} ${visibleBgColor} active:${visibleActiveBgColor} ${visibleBorder}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;
