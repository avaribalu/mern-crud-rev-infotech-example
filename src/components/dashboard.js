import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  MDBBtn
} from "mdbreact";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      redirectTo:null
    };
  }
  componentDidMount() {
    axios.get("/user/all").then(res => {
      this.setState({ user: res.data });
      console.log(this.state.user);
    });
  }

  getCookie() {
    var name = "adminloggedIn=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  delete(id) {
    console.log(id);
    axios.delete("/user/api/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  logout(id) {
    document.cookie = "adminloggedIn=false";
    this.setState({
      redirectTo: "/admin"
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const check = (this.getCookie() === 'true');
    console.log(check);
    return (
      <Card>
        {check ? (
          <CardBody>
            <CardTitle className="h4 text-center mb-4">All User</CardTitle>
            <Table>
              <TableHead color="primary-color" textWhite>
                <tr>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>About</th>
                  <th>Edit</th>
                  <th>View</th>
                </tr>
              </TableHead>
              <TableBody>
                {this.state.user.map(user => (
                  <tr>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.username}</td>
                    <td>{user.about}</td>
                    <td>
                      <Link to={`/edit/${user._id}`}>
                        <i className="fa fa-pencil mt-0 teal-text" />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/view/${user._id}`}>
                        <i className="fa fa-eye mt-0 teal-text" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Row>
              <Col sm="4" />
              <Col sm="4">
                <Link to={`/create`}>
                  Created New User <i className="fa fa-plus mt-0 teal-text" />
                </Link>
              </Col>
              <Col sm="4">
              <button
                onClick={this.logout.bind(this,false)}>
                <i className="fa fa-sign-out mt-0 teal-text" />
              </button>
              </Col>
            </Row>
          </CardBody>
        ) : (
          <Redirect to="/admin" />
        )}
      </Card>
    );
  }
}

export default Dashboard;
