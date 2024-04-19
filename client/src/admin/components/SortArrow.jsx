import { useState } from "react";

export default function (props) {
    const [order, setOrder] = useState('asc');

    const handleClick = (newOrder) => {
        setOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
        props.onClick(newOrder, props.column)
    };

    return (
        <>
            {order === 'asc' ? (
                <i className="sort-arrow fa-solid fa-caret-up" onClick={() => handleClick('desc')}></i>
            ) : (
                <i className="sort-arrow fa-solid fa-caret-down" onClick={() => handleClick('asc')}></i>
            )}
        </>
    );
}