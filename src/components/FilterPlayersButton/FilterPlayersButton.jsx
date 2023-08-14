import styles from './FilterPlayersButton.module.scss';

const FilterPlayersButton = ({
    refItem,
    toggleFilterItems,
    activeItem,
    isFilterItemsShown,
    filterItems,
    filterList,
}) => {
    return (
        <div
            ref={refItem}
            className='flex gap-1 px-2 py-1 flex-col border rounded-md w-fit mb-4 relative'
        >
            <button onClick={toggleFilterItems}>{activeItem}</button>
            {isFilterItemsShown && (
                <ul className='absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-slate-50 border p-2 rounded-md flex flex-col gap-3 max-h-80 overflow-x-hidden overflow-y-auto'>
                    <li
                        className='cursor-pointer border-b'
                        onClick={() => filterList('All')}
                    >
                        All
                    </li>
                    {filterItems.map((item) => (
                        <>
                            <li
                                key={item}
                                className='cursor-pointer border-b'
                                onClick={() => filterList(item)}
                            >
                                {item}
                            </li>
                        </>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterPlayersButton;
