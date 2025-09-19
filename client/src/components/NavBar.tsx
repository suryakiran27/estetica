import { Container, Navbar } from "react-bootstrap"
import { PiNotebookThin } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../features/store";


const NavBar = () => {
    const authDetails = useSelector((state: RootState) => state.authDetails);
    console.log({ authDetails });

    return (
        <Navbar bg="light" variant="light" className="mb-1 nav">
            <Container className="justify-between">
                <div className="d-flex" style={{ gap: 20, alignItems: 'center', marginLeft: 40 }}>
                    <PiNotebookThin className="" />
                    <Navbar.Brand className="d-flex" style={{ gap: 10, alignItems: 'center' }}>
                        <h2 className="heading">Estetica</h2>
                        <div>
                            <div className="user-name">Welcome Back, {authDetails?.name}</div>
                            <div className="caption">Hello, here you can manage your orders by zone</div>
                        </div>
                    </Navbar.Brand>
                </div>
            </Container>
            <div className="d-flex" style={{ gap: 20, alignItems: 'center' }}>
                <div style={{ width: 300 }}>
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <IoNotificationsOutline color="black" size={20} />
                <div className="d-flex" style={{ gap: 10, alignItems: 'center', marginRight: 40, cursor: 'pointer' }}>
                    <img src="https://i.pravatar.cc/300" alt="User Avatar" height={50} width={50} style={{ borderRadius: '50%' }} />
                    <span>{authDetails?.name}</span>
                </div>
            </div>
        </Navbar>
    )
}

export default NavBar