import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse
} from "mdbreact";

class NavbarEx extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  state = {
    isOpen: false
  };
  toggleCollapse = this.setState({ isOpen: !this.state.isOpen });
  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
            first_name:null,
            last_name:null,
            about:null,
            adminloggedIn:null
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    
    console.log("navbar render, props: ");
    console.log(this.props);

    return (
      <div className="app">
        <div className="App-header">
          {loggedIn? (
            <Navbar color="default-color" dark expand="md">
              <NavbarBrand>
                <strong className="white-text">Rev Infotech</strong>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleCollapse} />
              <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <NavbarNav right>
                  <NavItem active>
                    <NavLink to="#" onClick={this.logout}>Logout</NavLink>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            </Navbar>
          ) : (<Navbar color="default-color" dark expand="md">
              <NavbarBrand>
                <strong className="white-text">Rev Infotech</strong>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleCollapse} />
              <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <NavbarNav right>
                  <NavItem>
                    <NavLink to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/signup">Sign up</NavLink>
                  </NavItem>
                </NavbarNav>
              </Collapse>
            </Navbar>
          )}
        </div>
      </div>
    );
  }
}

export default NavbarEx;
