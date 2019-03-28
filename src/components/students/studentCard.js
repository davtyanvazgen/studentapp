import React, { useState } from "react";
import EditStudentModal from "../../containers/students/editStudent";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserTimes, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteStudentModal from "./deleteStudentModal";
import {
  ListGroupItem,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "reactstrap";

const StudentCard = props => {
  const { statuses, courses, student, firestore } = props;
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    statuses.filter(status => status.id === student.status)
  );
  const [currentCourse, setCurrentCourse] = useState(
    courses.filter(course => course.id === student.course)
  );

  function toggle() {
    setcollapse(!collapse);
  }

  function handleRemove() {
    const storage = props.firebase.storage();
    const storageRef = storage.ref();
    if (student.imageName !== undefined) {
      storageRef
        .child(`studentsAvatar/${student.imageName}`)
        .delete()
        .catch(function(error) {
          alert(error.message);
        });
    }

    firestore
      .collection("students")
      .doc(student.id)
      .delete()
      .catch(err => {
        alert(err.message);
      });

    firestore
      .collection("deletedStudents")
      .doc(student.id)
      .set(student)
      .catch(err => {
        alert(err.message);
      });
  }

  function handleSelectCourseChange(e) {
    let newCourse = courses.filter(
      course => course.longName === e.target.value
    );
    setCurrentCourse(newCourse);
    firestore
      .collection("students")
      .doc(student.id)
      .update({
        course: newCourse[0].id,
        courseName: newCourse[0].longName
      })
      .catch(err => {
        alert(err.message);
      });
    mouseout();
  }

  function handleSelectStatusChange(e) {
    let newStatus = statuses.filter(
      status => status.longName === e.target.value
    );
    setCurrentStatus(newStatus);

    firestore
      .collection("students")
      .doc(student.id)
      .update({
        status: newStatus[0].id,
        statusName: newStatus[0].longName
      })
      .catch(err => {
        alert(err.message);
      });
    mouseout();
  }

  function toggleStatus() {
    setIsOpenStatus(!isOpenStatus);
  }
  function toggleCourse() {
    setIsOpenCourse(!isOpenCourse);
  }
  function toggleDeleteStudent() {
    setModal(!modal);
    mouseout(id);
  }
  function toggleEdit() {
    setModalEdit(!modalEdit);
    mouseout(id);
  }

  const appData = `App date: ${student.date
    .toDate()
    .getDate()}/${student.date.toDate().getMonth() +
    1}/${student.date.toDate().getFullYear()}`;

  function mouseover() {
    var element = document.getElementById(id);
    element.style.border = "2px solid grey";
    element.style.backgroundColor = props.background;
  }
  function mouseout() {
    var element = document.getElementById(id);
    element.removeAttribute("style");
    element.style.borderRight = `5px solid ${currentStatus[0].color}`;
    element.style.borderLeft = `5px solid ${currentCourse[0].color}`;
    element.style.backgroundColor = props.background;
    element.style.marginTop = "1px";
  }
  const id = student.id;
  return (
    <>
      <ListGroupItem
        onMouseOver={() => {
          mouseover(id);
        }}
        onMouseOut={() => {
          mouseout(id);
        }}
        id={`${id}`}
        style={{
          borderRight: `5px solid ${currentStatus[0].color}`,
          borderLeft: `5px solid ${currentCourse[0].color}`,
          backgroundColor: props.background,
          marginTop: "1px"
        }}
      >
        <Row>
          <Col xs="5" md="2" onClick={toggle}>
            <div
              style={{ backgroundImage: `url(${student.url})` }}
              className="media"
            />
          </Col>

          <Col xs="6" md="5" className="colwr" onClick={toggle}>
            <p className="fullname">{student.fullName.toUpperCase()}</p>
            <p className="registerDate">{appData}</p>
          </Col>

          <Col xs="10" md="4">
            <Row className="dropRow">
              <ButtonDropdown isOpen={isOpenStatus} toggle={toggleStatus}>
                <DropdownToggle
                  className="badge badge-pill badges"
                  style={{
                    backgroundColor: currentStatus[0].color,
                    borderColor: currentStatus[0].color
                  }}
                  caret
                  size="sm"
                >
                  {student.statusName}
                </DropdownToggle>
                <DropdownMenu>
                  {statuses &&
                    statuses.map(status => (
                      <DropdownItem
                        key={status.id}
                        value={status.longName}
                        onClick={handleSelectStatusChange}
                      >
                        {status.longName}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
            <Row className="blockRow">
              <ButtonDropdown isOpen={isOpenCourse} toggle={toggleCourse}>
                <DropdownToggle
                  className="badge badge-pill badges"
                  style={{
                    backgroundColor: currentCourse[0].color,
                    borderColor: currentCourse[0].color
                  }}
                  caret
                  size="sm"
                >
                  {student.courseName}
                </DropdownToggle>
                <DropdownMenu>
                  {courses &&
                    courses.map(course => (
                      <DropdownItem
                        key={course.id}
                        value={course.longName}
                        onClick={handleSelectCourseChange}
                      >
                        {course.longName}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Row>
          </Col>

          <Col xs="1">
            <Row>
              <Col className="center">
                <FontAwesomeIcon
                  className="editDeleteIcon"
                  icon="user-times"
                  onClick={toggleDeleteStudent}
                />
                <hr />
                <FontAwesomeIcon
                  className="editDeleteIcon"
                  icon="user-edit"
                  onClick={toggleEdit}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Collapse isOpen={collapse}>
          <hr />
          <Row>
            <Col xs="12" md="4" className="center">
              <span className="info">Email: </span>
              <br />
              {student.email}
            </Col>
            <Col xs="12" md="2" className="center">
              <span className="info">Phone: </span>
              <br />
              {student.phone}
            </Col>
            <Col xs="12" md="6" className="center">
              <span className="info">Knowledge: </span>
              <br />
              {student.knowledge}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="center">
              <span className="info">Comment: </span>
              {student.comment}
            </Col>
          </Row>
        </Collapse>

        <EditStudentModal
          student={student}
          toggle={toggleEdit}
          modal={modalEdit}
        />
        <DeleteStudentModal
          toggleDeleteStudent={toggleDeleteStudent}
          modal={modal}
          student={student.fullName}
          handleRemove={handleRemove}
        />
      </ListGroupItem>
    </>
  );
};

export default compose(
  firestoreConnect(() => ["statuses", "courses"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    courses: state.firestore.ordered.courses
  }))
)(withFirestore(StudentCard));

library.add(faUserTimes, faUserEdit);
