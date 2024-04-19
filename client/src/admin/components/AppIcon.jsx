import { Link } from "react-router-dom";

export default function (props) {

    const handleOnClick = () => {
        if (props.item) {
            props.onClick(props.item);
        } else {
            props.onClick();
        }
    }

    return (
        <>

            {
                props.to ?
                    <div className="tooltip">
                        <Link to={props.to}>
                            <i className={"fas fa-" + props.icon + " icon"}></i>
                            {
                                props.title &&
                                <div className="top">{props.title}<i></i></div>
                            }
                        </Link>
                    </div>
                    :
                    <div className="tooltip">
                        <i className={"fas fa-" + props.icon + " icon"} onClick={handleOnClick}></i>
                        {
                            props.title &&
                            <div className="top">{props.title}<i></i></div>
                        }
                    </div>
            }
        </>
    );
}