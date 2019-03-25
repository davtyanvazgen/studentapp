import React, { useState } from "react";
import "../../styles/authentication.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

function SignIn({ firebase, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adminLogIn = function(e) {
    e.preventDefault();
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location = "/registration";
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      alert("please enter correct email or password");
    }
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="help">
        <h4>
          In the email field enter <span className="span">admin@am.com</span>
        </h4>
        <h4>
          In the password field enter <span className="span"> admin2019 </span>
        </h4>
      </div>

      <div id="container">
        <div className="miniContainer">
          <Form onSubmit={adminLogIn}>
            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input
                value={email}
                type="email"
                name="email"
                onChange={handleEmail}
                placeholder="admin@am.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                value={password}
                type="password"
                name="password"
                onChange={handlePassword}
                placeholder="admin2019"
              />
            </FormGroup>
            <Button color="success" type="submit" block>
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignIn);
