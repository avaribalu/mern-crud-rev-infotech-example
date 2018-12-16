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
      user: []
    };
  }
  componentDidMount() {
    axios.get("/user/all").then(res => {
      this.setState({ user: res.data });
      console.log(this.state.user);
    });
  }

  delete(id) {
    alert(id);
    console.log(id);
    axios.delete("/user/api/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const adminloggedIn = this.props.adminloggedIn;
    return (
      <Card>
        {adminloggedIn ? (
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
              <Col sm="8" />
              <Col sm="4">
                  <Link to={`/create`}>
                    Created New User <i className="fa fa-plus mt-0 teal-text" />
                  </Link>
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
