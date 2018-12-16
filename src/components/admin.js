import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  Card,
  CardBody,
  CardTitle
} from "mdbreact";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    if(this.state.username === "admin" && this.state.password==="admin"){
      this.props.updateUser({
        adminloggedIn: true,
        username:"AdminLogin"
      });
      console.log(this.props.adminloggedIn);
      redirectTo: "/dashboard"
    }

    {/*axios
      .post("/admin/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateAdmnUser({
            adminLoggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/admin/index"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      }); */}
  }

  render() {
    const adminloggedIn = this.props.adminloggedIn;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (

        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="3" />
              <MDBCol md="6" className="SignupForm">
                <form>
                  <Card className="SignupForm">
                    <CardBody>
                      <CardTitle className="h4 text-center mb-4">
                        Admin Login
                      </CardTitle>
                      <label htmlFor="defaultFormRegisterEmailEx">
                        User Name
                      </label>
                      <input
                        type="email"
                        id="defaultFormRegisterEmailEx"
                        className="form-control"
                        name="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                      />

                      <br />
                      <label htmlFor="defaultFormRegisterPasswordEx">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        id="defaultFormRegisterPasswordEx"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <div className="text-center mt-4">
                        <MDBBtn
                          color="cyan"
                          onClick={this.handleSubmit}
                          type="submit"
                        >
                          Sign In
                        </MDBBtn>
                      </div>
                    </CardBody>
                  </Card>
                </form>
              </MDBCol>
              <MDBCol md="3" />
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }
  }
}

export default Admin;
