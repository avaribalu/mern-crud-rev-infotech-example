import React, { Component } from "react";
import { Card, CardBody,CardTitle} from "mdbreact";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Profile extends React.Component {
  state = {
    flipped: false
  };

  handleFlipping = () => {
    this.setState({ flipped: !this.state.flipped });
  };

  render() {
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
                    value={this.props.first_name}
                    disabled
                  />

                  <label htmlFor="defaultFormRegisterEmailEx">Last Name</label>
                  <input
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="last_name"
                    value={this.props.last_name}
                    disabled
                  />

                  <label htmlFor="defaultFormRegisterEmailEx">Email</label>
                  <input
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="username"
                    value={this.props.username}
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
                    value={this.props.about}
                  />
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

export default Profile;
