import React, { Component } from 'react'

import firebase from 'firebase';
import StyledFirebaseAuth  from 'react-firebaseui/StyledFirebaseAuth'
firebase.initializeApp({
  // apiKey:
  // authDomain: 
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
      <div className="App">
        {this.state.isSignIn ? 
       <React.Fragment>
          <p>Signed In</p> 
        <button onClick={()=> firebase.auth().signOut()}>SignOut</button> 
        <h1>Welcome {firebase.auth().currentUser.displayName} </h1>
       </React.Fragment>
        :
       <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
       />
      }
      </div>
    )
  }
}
