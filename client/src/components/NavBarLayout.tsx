import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const NavBarLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default NavBarLayout