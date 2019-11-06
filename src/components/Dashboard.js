import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import firebase from "firebase";
import Data from "./Data";
import Welcome from "./Welcome";
import Contact from "./Contact";

import {
  faHome,
  faTh,
  faLayerGroup,
  faUser,
  faTags,
  faChartLine,
  faCog,
  faFire,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthContext from "../contexts/AuthContext";

export default class Dashboard extends Component {
  static contextType = AuthContext;
  state ={
    mediaQuery: false
  }
  render() {
    return (
      <div className={this.state.mediaQuery ? "dashboard" : "dashboard-mini"}>
      <aside className="dashboard-nav">
        <div className="dashboard-nav__about">
          <img src={firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"} alt="face-img"/>
          <div className="dashboard-nav__description">
            <h3>{firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Jonathan Doe"}</h3>
            <p> {firebase.auth().currentUser ? firebase.auth().currentUser.email : "johndoe@gmail.com"}</p>
          </div>
        </div>
      <span className="menu-wrapper">
      <ul className="dashboard-nav__list">
          <li> <Link to="/dashboard"><span className="svg-wrap"><FontAwesomeIcon icon={faTh} /></span>
          <span className="title">Dashboard</span></Link>
          </li>
          <li>
          <Link to="/dashboard/data">
          <span className="svg-wrap">
          <FontAwesomeIcon icon={faUser} /></span> <span className="title">User</span>
            </Link>
          </li>
          <li><Link to="/dashboard/contact">
            <span className="svg-wrap"><FontAwesomeIcon icon={faTags} /></span>
            <span className="title">Tags</span></Link>
          </li>
          <li><Link to="/dashboard/contact">
            <span className="svg-wrap"><FontAwesomeIcon icon={faFire} /></span>
            <span className="title">Account</span></Link>
          </li>
          <li> <Link to="/dashboard/contact">
            <span className="svg-wrap"><FontAwesomeIcon icon={faChartLine} /></span>
           <span className="title">Summary</span></Link>
          </li>
        </ul >

    <hr className="hr"/>
        <ul>
        <li><Link to="/dashboard/contact">
          <span className="svg-wrap"><FontAwesomeIcon icon={faLayerGroup} /></span>
            <span className="title">Layout</span></Link>
          </li>
        <li><Link to="/dashboard/contact">
          <span className="svg-wrap"><FontAwesomeIcon icon={faCog} /></span>
           <span className="title">Settings</span></Link>
          </li>
        </ul>
      </span>

        <ul>
        <li onClick={() => this.setState({mediaQuery: !this.state.mediaQuery})}><span className="svg-wrap"><FontAwesomeIcon icon={faSlidersH} /></span>
           <span className="title">Toggle menu</span>
          </li>
        </ul>
      </aside>
      <section className="dashboard__content">
      
        {this.context.isSignIn ? (
          <Route path="/dashboard/" exact component={Welcome} />
        ) : (
          ""
        )}
        {this.context.isSignIn ? (
          <Route path="/dashboard/contact" component={Contact} />
        ) : (
          ""
        )}
        {this.context.isSignIn ? (
          <Route path="/dashboard/data" component={Data} />
        ) : (
          ""
        )}
        </section>
      </div>
    );
  }
}
