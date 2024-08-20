import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { useSelector } from "react-redux";
import { sv } from "../../helpers/sv";

export default function () {
    const year = new Date().getFullYear()
    const { user } = useSelector(state => state.auth)

    return (
        <HomeLayout>
            <section className="header">
                <div className="front-topnav  wrapper" id="myHeader">
                    <div className="logo">
                        <Link to="/">MODGEN</Link>
                    </div>
                    <ul className="nav">
                        {user 
                        ? <li className="dashboard"><Link className="fbtn-outline" to="/admin/modules">Modules</Link></li>
                        :<li className="login"><Link className="fbtn-outline" to="/login">Sign In</Link></li>
                    }
                    </ul>
                </div>
                <div className="hero wrapper">
                    <h2 className="hero-heading">Generate module with ease.</h2>
                    <div className="hero-text">
                        <p>Are you tired of the tedious process of creating new modules from scratch every time. Here is your user-friendly interface with powerful features loaded module generator in a few clicks.</p>
                        <Link className="fbtn" to="/register">Get Started</Link>
                    </div>
                </div>
            </section>
            <section className="part">
                <div className="wrapper bridge">
                    <div className="bridge-item bridge-text">
                        <h3 className="sub-heading">Say goodbye to manual file creation</h3>
                        <p>Once your ideal module is created, Modgen seamlessly generate new modules from it. Provide your upcoming modules in lowercase. You can have spaces along with new modules.</p>
                    </div>
                    <div className="bridge-item bridge-image">
                        <img src="./images/cog-wheels.png" className="cog-wheels" />
                    </div>
                </div>
            </section>
            <section className="part-3">
                <div className="wrapper">
                    <h3 className="footer-heading">No more manual copying...</h3>
                    <p>Downloaded module will have specifically replaced all the names for you. You can esily integrate this to the existing project. You have update option for the ideal module for the better performance and adapt upcoming changes.</p>
                    <p className="copyright">&copy; {year} Modgen, Powered By <Link to="http://dipik.in">DIPIK</Link>.</p>
                </div>
            </section>
        </HomeLayout>
    )
}
