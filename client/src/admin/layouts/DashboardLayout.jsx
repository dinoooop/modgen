import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../components/SideNav';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfilePic from '../components/ProfilePic';
import { check } from '../../front/auth/authSlice';

export default function (props) {

    const theme = useSelector((state) => state.auth.theme);
    const [viewSidenav, setViewSideNav] = useState(false);
    const themeIcon = 'sample';
    const authUser = useSelector(state => state.auth.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const toggelTheme = () => {
    }

    useEffect(() => {

        if (!authUser) {
            navigate('/login')
        }
        
        dispatch(check())
    }, [dispatch])

    return (
        <div className={theme}>

            <div className="container">

                <aside id="sidenav" className={viewSidenav ? 'display-aside' : ''}>

                    <div className="logo-top">
                        <div className="logo">
                            <Link to="/">
                                <img src="/images/logo.png" alt="" />
                                <div className='logo-text'>MODGEN</div>
                            </Link>
                        </div>
                        <div className="close"><i className="fa-solid fa-close" onClick={() => setViewSideNav(!viewSidenav)}></i></div>
                    </div>

                    <SideNav />

                </aside>

                <main>
                    <div className="topnav">
                        <div className="menu" id="menu" onClick={() => setViewSideNav(!viewSidenav)}><i className="fa-solid fa-bars"></i></div>
                        <div id="theme-toggler"><i className={"fa-solid fa-" + themeIcon}></i></div>
                        <ProfilePic />
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </main>

            </div>
        </div>
    );
}