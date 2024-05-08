import Basic from '../../helpers/Basic';
import SideNavButton from './SideNavButton';

export default function () {

    const basic = new Basic()

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Modules" icon="fa-solid fa-circle-check" href="/admin/modules" />
                {
                    basic.has("admin") &&
                    <>
                        <SideNavButton title="Flush" icon="fa-solid fa-bolt" href="/admin/flush" />
                        <SideNavButton title="Users" icon="fa-solid fa-user" href="/admin/users" />
                    </>
                }
            </ul>
        </div >
    );
}