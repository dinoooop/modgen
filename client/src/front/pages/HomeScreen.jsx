import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

export default function () {
    const year = new Date().getFullYear()
    return (
        <HomeLayout>
            <section className="header">
                <div className="front-topnav  wrapper" id="myHeader">
                    <div className="logo">
                        <Link to="/">MODGEN</Link>
                    </div>
                    <ul className="nav">
                        <li className="login"><Link className="fbtn-outline" to="/login">Sign In</Link></li>
                    </ul>
                </div>
                <div className="hero wrapper">
                    <h2 className="hero-heading">Generate module with ease.</h2>
                    <div className="hero-text">
                        <p>Are you tired of the tedious process of creating new modules from scratch every time. Here is your user-friendly interface and powerful features, you can create fully functional modules in just a few clicks.</p>
                        <Link className="fbtn" to="/register">Get Started</Link>
                    </div>
                </div>
            </section>
            <section className="part">
                <div className="wrapper bridge">
                    <div className="bridge-item bridge-text">
                        <h3>Say goodbye to manual file creation</h3>
                        <p>Once your module is generated, ModuleMaker seamlessly integrates it into your existing project structure. No more manual copying and pasting of files – just sit back and let the app handle the integration.</p>
                    </div>
                    <div className="bridge-item bridge-image">
                        <img src="./images/cog-wheels.png" className="cog-wheels" />
                    </div>
                </div>
            </section>
            <section className="part-3">
                <div className="wrapper">
                    <h4>No more manual copying</h4>
                    <p>Once your module is generated, ModuleMaker seamlessly integrates it into your existing project structure. No more manual copying and pasting of files – just sit back and let the app handle the integration.</p>
                    <p className="copyright">&copy; {year} Modgen, Powered By <Link to="http://dipik.in">DIPIK</Link>.</p>
                </div>
            </section>
        </HomeLayout>
    )
}
