import React, { Component } from 'react'
import StyledFirebaseAuth  from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Data from './components/Data'
import Welcome from './components/Welcome';

firebase.initializeApp({

})

export default class App extends Component {

  state = {
    isSignIn: false,
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user=> {
      this.setState({isSignIn:!!user})
    })
  }
  render() {
    return (
      <BrowserRouter>
      <header>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
      </ul>
      <div className="App">
        {this.state.isSignIn ? 
       <React.Fragment>
          <p>Signed In</p> 
        <button onClick={()=> firebase.auth().signOut()}>SignOut</button> 
        <h1>Welcome </h1>
       </React.Fragment>
        :
        <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
      }
      </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/welcome" component={Welcome} />
        <Route path="/dashboard/data" component={Data} />
      </Switch>
      </BrowserRouter>
    )
  }
}
