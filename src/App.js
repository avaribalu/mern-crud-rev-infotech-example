import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import AdminLogin from './components/admin'
import NavbarEx from './components/navbar'
import Home from './components/home'
import Dashboard from './components/dashboard'
import Profile from './components/Profile'
import Edit from './components/edit'
import View from './components/View'
import Create from './components/sign-up-created'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      first_name:null,
      last_name:null,
      about:null,
      adminloggedIn:false
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  updateAdminUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          first_name:response.data.user.first_name,
          last_name:response.data.user.last_name,
          about:response.data.user.about,
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          first_name:null,
          last_name:null,
          about:null
        })
      }
    })
  }

  render() {
    const loginRK = this.state.loggedIn;
    return (
      <div>
        {/* greet user if logged in: */}
        {loginRK?(
          <div>
            <NavbarEx updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
            <Profile username={this.state.username} first_name={this.state.first_name} last_name={this.state.last_name} about={this.state.about}/>
          </div>
        ):(<NavbarEx />

        )
        }
        {/* Routes to different components */}
        <Route exact path="/" component={Home} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/view/:id' component={View} />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />}/>
        <Route path="/dashboard" render={() => <Dashboard adminloggedIn={this.state.adminloggedIn} updateUser={this.updateUser}/>}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/create" component={Create}/>
        <Route path="/admin" render={() => <AdminLogin adminloggedIn={this.state.adminloggedIn} updateUser={this.updateUser}/>}/>
      </div>
    );
  }
}

export default App;
