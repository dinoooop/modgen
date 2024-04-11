import ProfilePic from './ProfilePic';
import { useSelector } from 'react-redux';

export default function (props) {

    let theme = useSelector((state) => state.auth.theme);
    const themeIcon = (theme == 'dark') ? 'sun' : 'moon';

    const toggelSideNav = () => {
    }

    const toggelTheme = () => {
    }

    return (
        <div className="topnav">
            <div className="menu" id="menu"><i className="fa-solid fa-bars"></i></div>
            <div id="theme-toggler"><i className={"fa-solid fa-" + themeIcon}></i></div>
            <ProfilePic />
        </div>

    );
}