import {Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">DQM Helper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/monsters">Monsters</Nav.Link>
                            <Nav.Link as={Link} to="/talents">Talents</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </>
    );


    //     <>
    //         <nav>
    //             <ul>
    //                 <li>
    //                     <Link to="/">Home</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/monsters">Monsters</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/contact">Contact</Link>
    //                 </li>
    //
    //             </ul>
    //         </nav>
    //
    //         <Outlet />
    //     </>
    // )
};

export default Layout;