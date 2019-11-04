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
      <div className="dashboard">
      <aside className="dashboard-nav">
      <ul className="dashboard-nav__list">
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
