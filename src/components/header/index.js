import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Navbar, Nav } from "reactstrap";
import "../styles/header.css";
import { withFirebase } from "react-redux-firebase";

const Header = ({ firebase }) => {
  const logout = () => {
    firebase.logout();
  };
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <div className="divWrapper">
          <div>
            <Nav className="ml-auto" navbar>
              <ButtonGroup>
                <Link to="/studentapp">
                  <Button size="sm" outline color="light" className="mr-1">
                    Students
                  </Button>
                </Link>

                <Link to="/statuses">
                  <Button size="sm" outline color="light" className="mr-1">
                    Statuses
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="sm" outline color="light" className="mr-1">
                    Courses
                  </Button>
                </Link>
              </ButtonGroup>
            </Nav>
          </div>
          <div>
            <Nav className="ml-auto" navbar>
              <ButtonGroup>
                <Link to="/signin">
                  <Button
                    size="sm"
                    outline
                    color="light"
                    className="mr-1"
                    onClick={logout}
                  >
                    Sign out
                  </Button>
                </Link>
              </ButtonGroup>
            </Nav>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default withFirebase(Header);
