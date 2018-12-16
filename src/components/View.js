import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "mdbreact";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      about: "",
      redirectTo: null,
      count: ""
    };
  }
  delete(id) {
    axios.delete("/user/api/" + this.props.match.params.id).then(result => {
      this.props.history.push("/dashboard");
    });
  }

  handleFlipping = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  componentDidMount() {
    axios.get("/user/api/" + this.props.match.params.id).then(res => {
      this.setState({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        username: res.data.username,
        about: res.data.about
      });
    });
  }
  render() {
    const adminloggedIn = this.props.adminloggedIn;
    return (
      <div className="Signup-Form">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3" />
            <MDBCol md="6">
              <Card className="SignupForm">
                <CardBody>
                  <CardTitle className="h4 text-center mb-4">Profile</CardTitle>
                  <label htmlFor="defaultFormRegisterEmailEx">First Name</label>
                  <input
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="first_name"
                    value={this.state.first_name}
                    disabled
                  />

                  <label htmlFor="defaultFormRegisterEmailEx">Last Name</label>
                  <input
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="last_name"
                    value={this.state.last_name}
                    disabled
                  />

                  <label htmlFor="defaultFormRegisterEmailEx">Email</label>
                  <input
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    disabled
                  />

                  <label htmlFor="defaultFormRegisterEmailEx">About</label>
                  <textarea
                    type="text"
                    id="defaultFormContactMessageEx"
                    className="form-control"
                    rows="3"
                    name="about"
                    disabled
                    value={this.state.about}
                  />
                  <br />
                  <MDBRow>
                    <MDBCol md="3" />
                    <MDBCol md="3">
                      <Link to={`/edit/${this.props.match.params.id}`}>
                        <button>
                          <i className="fa fa-pencil mt-0 teal-text" />
                        </button>
                      </Link>
                    </MDBCol>
                    <MDBCol md="3">
                      <button
                        onClick={this.delete.bind(
                          this,
                          this.props.match.params.id
                        )}
                      >
                        <i className="fa fa-remove mt-0 teal-text" />
                      </button>
                    </MDBCol>
                    <MDBCol md="3" />
                  </MDBRow>
                </CardBody>
              </Card>
            </MDBCol>
            <MDBCol md="3" />
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default View;
