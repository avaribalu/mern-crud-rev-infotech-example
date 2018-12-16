//var React = require('react/addons');
import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  Card,
  CardBody,
  CardTitle,
  MDBBtn
} from "mdbreact";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      about: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('/user/api/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          username: res.data.username,
          about: res.data.about
         });
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios.
      put('/user/api/'+this.props.match.params.id, {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          about: this.state.about
         }).then(response => {
           this.setState({
            redirectTo: "/dashboard"
          })
        }).catch(error => {
          console.log("signup error: ");
          console.log(error);
        });
        this.props.history.push("/dashboard");
  }
  render() {
    const adminloggedIn = this.props.adminloggedIn;
    return (
      <div className="Signup-Form">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3" />
            <MDBCol md="6" className="SignupForm">
              <form>
                <Card className="SignupForm">
                  <CardBody>
                    <CardTitle className="h4 text-center mb-4">
                      Edit
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
                        Update
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

export default Edit;
