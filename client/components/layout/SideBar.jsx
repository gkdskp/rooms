import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
// import { AuthContext } from "../../context/auth";

import { HouseDoor } from "react-bootstrap-icons";
import {
  Person,
  PersonCheck,
  Question,
  Wallet,
  DoorClosed,
} from "react-bootstrap-icons";

export default function SideBar() {
//   const [authState, authDispatch] = useContext(AuthContext);
  const { pathname } = useRouter();

  const isActive = (endpoint) => {
    return new RegExp(`${endpoint}`).test(pathname);
  };

  const logOut = () => {
    authDispatch({type: "logout"});
  }

  return (
    <Navbar
      className="navbar col-lg-2 col-sm-12"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Navbar.Brand className="side-logo mt-lg-5" href="/">
        <h4 style={{
          fontWeight: "bold",
          letterSpacing: "0.8"
        }}>rooms</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto mt-lg-5 flex-lg-column">
          <Link href="/fee/" passHref>
            <Nav.Link active={isActive("/fee")}>
              <Person size={18} className="mr-4" /> Fee
            </Nav.Link>
          </Link>
          <Link href="/leave/" passHref>
            <Nav.Link active={isActive("/leave")}>
              <PersonCheck size={18} className="mr-4" /> Leave
            </Nav.Link>
          </Link>
          <hr className="mt-5" />
          <Nav.Link onClick={logOut}>
            <DoorClosed size={18} className="mr-4" /> Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}