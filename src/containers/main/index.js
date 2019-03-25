import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AddCourse from "../../components/courses";
import AddStatus from "../../components/statuses";
import Students from "../students/students";
import RegistrationForm from "../../components/authentication/registrationForm/index";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const Main = ({ auth }) => {
  return !isLoaded(auth) ? (
    <div className="lds-hourglass" />
  ) : isEmpty(auth) ? (
    <Redirect to="/signin" />
  ) : (
    <div>
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/courses" component={AddCourse} />
            <Route path="/statuses" component={AddStatus} />
            <Route path="/registration" component={RegistrationForm} />
            <Route exact path="/studentapp" component={Students} />
            <Redirect to="/studentapp" />
          </Switch>
          <Footer />
        </>
      </Router>
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(Main);
