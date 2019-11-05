import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

import {
  faHome,
  faTh,
 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_AUTH_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN
});

class AuthContextProvider extends Component {
  state = {
    isSignIn: false,
    signInButton: false
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
  signOut = () => {
    firebase.auth().signOut();
    this.setState({
      signInButton: false
    })
  }
  render() {

    return (
      
      <BrowserRouter>
        <AuthContext.Provider value={{ isSignIn: this.state.isSignIn }}>
          <header className="app-header">
            <div className="app-header__logo">
            
              <img src="https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png" alt="logo"/>
              <p>NETFLIX</p>
            </div>
         <nav className="app-header__nav">
         <ul className="app-header__list">
              <li>
                <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
                </li>
      
               { !this.state.isSignIn  && <li><button onClick={() => this.setState({signInButton:!this.state.signInButton})} className="btn">Login / Register</button></li>} 
        
              {this.state.isSignIn && (
                <li>
                  <Link to="/dashboard"><FontAwesomeIcon icon={faTh} /></Link>
                </li>
              
              )}
              {this.state.isSignIn ? (
                <li>
                  {" "}
                  <button className="btn" onClick={this.signOut}>
                    SignOut
                  </button>{" "}
                </li>
              ) : (
               this.state.signInButton && 
               <div className="overlay">
                 <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
               </div>
              )}
            </ul>
         </nav>
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
