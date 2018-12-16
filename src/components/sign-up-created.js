//var React = require('react/addons');
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  Card,
  CardBody,
  CardTitle,
  MDBBtn
} from "mdbreact";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      about: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
      {/* this.state.username.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.first_name > 0 &&
      this.state.about > 0 */}

      event.preventDefault();
      event.target.className += " was-validated";

      //request to server to add a new username/password
      axios
        .post("/user/", {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          password: this.state.password,
          about: this.state.about
        })
        .then(response => {
          console.log(response);
          if (!response.data.errmsg) {
            console.log("successful signup");
            this.setState({redirectTo: "/dashboard"});
            } else {
            console.log("username already taken");
          }
        })
        .catch(error => {
          console.log("signup error: ");
          console.log(error);
        });
        this.props.history.push("/dashboard");
  }
  render() {
    var btnRk = {
      padding: "-0.16rem 2.14rem"
    };
    return (
      <div className="Signup-Form">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3" />
            <MDBCol md="6" className="SignupForm">
              <form method="post">
                <Card className="SignupForm">
                  <CardBody>
                    <CardTitle className="h4 text-center mb-4">
                      Sign up
                    </CardTitle>

                    <label htmlFor="defaultFormRegisterNameEx">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="defaultFormRegisterFirstNameEx"
                      className="form-control"
                      name="first_name"
                      required
                      value={this.state.first_name}
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="defaultFormRegisterNameEx">Last Name</label>
                    <input
                      type="text"
                      id="defaultFormRegisterLastNameEx"
                      className="form-control"
                      name="last_name"
                      required
                      value={this.state.last_name}
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="defaultFormRegisterEmailEx">Email</label>
                    <input
                      type="email"
                      required
                      id="defaultFormRegisterEmailEx"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="defaultFormRegisterPasswordEx">
                      password
                    </label>
                    <input
                      type="password"
                      required
                      id="defaultFormRegisterPasswordEx"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="defaultFormContactMessageEx">
                      Tell Me About Yourself
                    </label>
                    <textarea
                      type="text"
                      id="defaultFormContactMessageEx"
                      className="form-control"
                      rows="3"
                      name="about"
                      value={this.state.about}
                      onChange={this.handleChange}
                    />
                    <div className="text-center mt-4">

                      <MDBBtn
                        color="cyan"
                        onClick={this.handleSubmit}
                        type="submit"
                      >
                        Sign up
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

export default Signup;
