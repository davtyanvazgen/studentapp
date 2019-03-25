import React, { useState } from "react";
import "../styles/courseAndStatusCard.css";
import Status from "./status";
import AddStatusForm from "./addStatusForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Col, Container, Row, Collapse, Button } from "reactstrap";

const AddStatus = ({ statuses, students }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <Container className="mainContainer">
      <Container>
        <Row>
          <Col className="center">
            <h1>Current statuses</h1>
            <Button
              className="addButton"
              color="info"
              onClick={toggle}
              size="sm"
            >
              Add new status
            </Button>
          </Col>
        </Row>

        <Collapse isOpen={collapse}>
          <Row>
            <AddStatusForm statuses={statuses} />
          </Row>
        </Collapse>
        <hr />
      </Container>

      <Container>
        <Row>
          {statuses ? (
            statuses
              .sort(function(a, b) {
                return a.sort - b.sort;
              })
              .map(status => (
                <Col xs="6" md="4" lg="3" key={status.id} className="martop">
                  <Status
                    key={status.id}
                    status={status}
                    students={students}
                    statuses={statuses}
                  />
                </Col>
              ))
          ) : (
            <div className="loader" />
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default compose(
  firestoreConnect(() => [
    { collection: "students", orderBy: "date" },
    { collection: "statuses", orderBy: "sort" }
  ]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    students: state.firestore.ordered.students
  }))
)(AddStatus);
