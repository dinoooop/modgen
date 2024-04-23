import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Modules" icon="fa-solid fa-circle-check" href="/admin/modules" />
            </ul>
        </div >
    );
}
