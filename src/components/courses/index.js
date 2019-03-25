import React, { useState } from "react";
import "../styles/courseAndStatusCard.css";
import Course from "./course";
import AddCourseForm from "./addCourseForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Row, Col, Container, Collapse, Button } from "reactstrap";

const AddCourse = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <Container className="mainContainer">
        <Container>
          <Row>
            <Col className="center">
              <h1>Current courses</h1>
              <Button
                className="addButton"
                color="info"
                onClick={toggle}
                size="sm"
              >
                Add new course
              </Button>
            </Col>
          </Row>

          <Row>
            <Collapse isOpen={collapse} className="collapse">
              <Col className="collapseCol">
                <AddCourseForm courses={props.courses} />
              </Col>
            </Collapse>
          </Row>
          <hr />
        </Container>

        <Container className="martop">
          <Row>
            {props.courses ? (
              props.courses
                .sort(function(a, b) {
                  return a.sort - b.sort;
                })
                .map(course => (
                  <Col xs="6" md="4" lg="3" key={course.id} className="martop">
                    <Course
                      key={course.id}
                      course={course}
                      students={props.students}
                      courses={props.courses}
                    />
                  </Col>
                ))
            ) : (
              <div className="loader" />
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default compose(
  firestoreConnect(() => [
    { collection: "students", orderBy: "date" },
    { collection: "courses", orderBy: "sort" }
  ]),
  connect((state, props) => ({
    courses: state.firestore.ordered.courses,
    students: state.firestore.ordered.students
  }))
)(AddCourse);
