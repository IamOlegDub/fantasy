import { useEffect } from 'react';

export function useOutsideClick(elementRef, handler, attached = true) {
    useEffect(() => {
        if (!attached) return;
        const handleClickOutside = (event) => {
            if (
                elementRef?.current &&
                !elementRef.current.contains(event.target)
            ) {
                handler();
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [attached, elementRef, handler]);
}
