import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Projects" icon="fa-solid fa-circle-check" href="/admin/projects" />
            </ul>
        </div >
    );
}
