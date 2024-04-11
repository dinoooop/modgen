import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Products" icon="fa-solid fa-circle-check" href="/projects" />
            </ul>
        </div >
    );
}
