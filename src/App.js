import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

firebase.initializeApp({
 
});

class AuthContextProvider extends Component {
  state = {
    isSignIn: false
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignIn: !!user });
    });
  };
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{ isSignIn: this.state.isSignIn }}>
          <header>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {this.state.isSignIn && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              {this.state.isSignIn ? (
                <li>
                  {" "}
                  <button onClick={() => firebase.auth().signOut()}>
                    SignOut
                  </button>{" "}
                </li>
              ) : (
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            </ul>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            {!this.state.isSignIn && <Redirect path="/dashboard/" to="/" />}
            {this.state.isSignIn ? (
              <Route path="/dashboard" component={Dashboard} />
            ) : (
              ""
            )}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default AuthContextProvider;
