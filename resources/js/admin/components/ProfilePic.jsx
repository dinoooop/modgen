import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../admin/auth/authSlice";

export default function () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [view, setView] = useState(false);

    const onClickToggler = () => {
        setView(!view);
    }

    const handleDocumentClick = (e) => {
        if (view && e.target !== window.profilePic) {
            setView(!view);
        }
    }

    const handleLogout = (e) => {
        dispatch(logout())
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }

    window.__root = document.getElementById('root');
    window.__root.addEventListener('click', handleDocumentClick)
    window.profilePic = document.querySelector(".profile-pic");

    return (
        <div className="dropdown-item">
            <div onClick={onClickToggler}>
                <img src="/images/avatar.png" className='profile-pic' />
            </div>
            {
                view &&
                <div className="dropdown">
                    <div className="dropdown-arrow"></div>
                    <div className="list-button">
                        <Link to={'/admin/profile'}><i className="fa-solid fa-user"></i>Profile</Link>
                        <Link to={'/admin/security'}><i className="fa-solid fa-lock"></i>Security</Link>
                        <div className="link" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>
                    </div>
                </div>
            }
        </div>
    );
    
}