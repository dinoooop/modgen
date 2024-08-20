import { Link } from "react-router-dom";

export default function (props) {
    const iconClass = props.icon ?? 'fa-solid fa-circle';
    return (
        <li>
            <Link className="nav-link" to={props.href}>
                <i className={iconClass}></i>
                <span className="menu-title">{props.title}</span>
            </Link>
        </li>
    );
}
