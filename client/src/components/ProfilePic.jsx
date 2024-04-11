import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

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

    const handleOnLogout = (e) => {
        
    }

    // window.__root = document.getElementById('main');
    // window.__root.addEventListener('click', handleDocumentClick)
    // window.profilePic = document.querySelector(".profile-pic");

    return (
        <div className="dropdown-item">
            <div onClick={onClickToggler}>
                <img src="pic.png" className='profile-pic' />
            </div>
            {
                view &&
                <div className="dropdown">
                    <div className="dropdown-arrow"></div>
                    <div className="list-button">
                        <Link to={'/profile/'}><i className="fa-solid fa-user"></i>Profile</Link>
                        <a href="#" onClick={handleOnLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</a>
                    </div>
                </div>
            }
        </div>
    );
}