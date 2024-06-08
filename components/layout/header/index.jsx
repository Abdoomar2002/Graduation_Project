import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiUserCircle } from "react-icons/bi";
import Logo from "../../../assets/images/logo.png";
import Language from "../../lang";
import { actions as authActions } from "../../../redux/auth";
import { t } from "i18next";

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth?.isAuth);
  useEffect(() => {
    // Handle local storage/Redux persistence of collapsed state (optional)
  }, []);
  const handleLogout = () => {
    dispatch(authActions.logout());
    return <Navigate to="/login" replace />; // `replace` prevents going back to previous page
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={Logo}
              alt="saf7a"
              width="80"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <NavDropdown
                title="lookUps"
                id="basic-nav-dropdown"
                to="/lookUps"
              >
                <NavDropdown.Item as={Link} to="/lookUps">
                  All LookUps
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/governorates">
                  Governorates
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/districts">
                  Districts
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/subscription-settings">
                  Subscription Settings
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/lookUps/universities">
                  Universities
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/colleges">
                  Colleges
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/departments">
                  Departments
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/university-years">
                  University Years
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/university-subjects">
                  University Subjects
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/tracks">
                  Tracks
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/levels">
                  Levels
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/years">
                  Years
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/divisions">
                  Divisions
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/lookUps/subjects">
                  Subjects
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Language />
          {isAuth && (
            <div className="nav-link px-2" href="#action6">
              <div className="user px-lg-2 text-center">
                <div className="user_icon">
                  <BiUserCircle />
                </div>
                <div className="user_text">
                  <h6 className="m-0">{isAuth?.UserName}</h6>
                  <a onClick={handleLogout} className="m-0" to="/">
                    {t("navBar.Logout")}
                  </a>
                </div>
              </div>
            </div>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
