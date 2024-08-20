import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function () {

    let theme = useSelector((state) => state.auth.theme);
    
    return (
        <div className="top">
            <div className="logo">
                <Link to="/">
                    <img src="" alt="" />
                    <div className='logo-text'>TIMLOG</div>
                </Link>
                <div className="close"><i className="fa-solid fa-close" id="close"></i></div>
            </div>
        </div>
    );
}
