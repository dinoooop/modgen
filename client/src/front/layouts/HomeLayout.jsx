import "../../styles/front.css";
import "../../styles/responsive.css";
import { useSelector } from 'react-redux';

export default function (props) {
    let theme = useSelector(state => state.auth.theme);
    return (
        <div className={theme}>
            {props.children}
        </div>
    );
}