import { getTextColor } from '../../positions';
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
            className='flex gap-1 px-4 py-2 flex-col border rounded-md w-fit relative'
        >
            <button onClick={toggleFilterItems}>{activeItem}</button>
            {isFilterItemsShown && (
                <ul className='absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-slate-50 border p-2 rounded-md flex flex-col gap-5 max-h-96 overflow-x-hidden overflow-y-auto'>
                    <li
                        className='cursor-pointer border p-2 rounded-md'
                        onClick={() => filterList('All')}
                    >
                        All
                    </li>
                    {filterItems.map((item) => (
                        <>
                            <li
                                key={item}
                                className='cursor-pointer border rounded-md p-2'
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
