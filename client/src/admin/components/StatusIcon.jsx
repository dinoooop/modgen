import { useEffect, useState } from "react";
import { sv } from "../../helpers/sv";

export default function (props) {


    const { item } = props;
    const [status, setStatus] = useState(item.status)
    const handleOnClick = () => {
        setStatus(prevStatus => prevStatus === sv.status("active")
            ? sv.status("inactive") : sv.status("active"))
    }

    useEffect(() => {
        props.onClick(item.id, status);
    }, [status]);


    return (
        <>
            {
                status === sv.status("active")
                    ?
                    <div className="tooltip">
                        <i className={"fas fa-square-check icon"} onClick={handleOnClick}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
                    :
                    <div className="tooltip">
                        <i className={"fas fa-circle-xmark icon"} onClick={handleOnClick}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
            }
        </>
    );
}