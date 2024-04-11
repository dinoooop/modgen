import { useState } from "react";

export default function(props) {
    const [order, setOrder] = useState('asc');

    const handleClick = (newOrder) => {
        setOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
        props.onClick(newOrder)
    };

    return (
        <>
            {order === 'asc' ? (
                <i className="sort-arrow fa-solid fa-caret-up" onClick={() => handleClick('asc')}></i>
            ) : (
                <i className="sort-arrow fa-solid fa-caret-down" onClick={() => handleClick('desc')}></i>
            )}
        </>
    );
}