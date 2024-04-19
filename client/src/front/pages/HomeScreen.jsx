import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

export default function () {
    return (
        <HomeLayout>
            <section>
                <div className="header  wrapper" id="myHeader">
                    <div className="logo">
                        <Link to="/">OLD SMOKE</Link>
                    </div>
                    <ul className="nav">
                        <li className="login"><Link to="/login">Sign In</Link></li>
                    </ul>
                </div>
                <div className="hero wrapper">
                    <h2 className="hero-text">Hello World</h2>
                </div>
            </section>
        </HomeLayout>
    )
}
