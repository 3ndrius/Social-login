import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Data from "./Data";
import Welcome from "./Welcome";
import Contact from "./Contact";

import AuthContext from "../contexts/AuthContext";

export default class Dashboard extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <div>
        <h1>Dashboard component protected</h1>
        <ul>
          <li>
            <Link to="/dashboard">Welcome</Link>
          </li>
          <li>
            <Link to="/dashboard/data">Data</Link>
          </li>
          <li>
            <Link to="/dashboard/contact">Contact</Link>
          </li>
        </ul>
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
      </div>
    );
  }
}
