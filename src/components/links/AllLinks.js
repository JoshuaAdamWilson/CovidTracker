import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Event, LocalHospital, Place } from "@material-ui/icons";
//material-ui
import StateLists from "./StateLists";
import SpecificDate from './SpecificDate'
import Info from "./Info";
import "../links/links.css"
import Profile from "../myaccount/Profile";
import PrivateRoute from "./routing/PrivateRoute";

const AllLinks = () => {

  return (
    <div className="main">
      <Router>
        <ul className='links'>
          <li>
            <Link to="/"><Place className='icon'/> States</Link>
          </li>
          <li>
            <Link to="/date"><Event className='icon'/>Check a Specific Date</Link>
          </li>
          <li>
            <Link to="/info"><LocalHospital  className='icon'/>Covid Infomation</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" render={() => <StateLists />} />

          <Route exact path="/date" render={() => <SpecificDate />} />

          <Route exact path="/info" render={(props) => <Info {...props} />} />

          <PrivateRoute exact path="/myaccount" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
};

export default AllLinks;
