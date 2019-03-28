import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Input,
  Row
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import DeleteStatusModal from "./deleteStatusModal";
import EditStatusModal from "./editStatusModal";

const Status = ({ statuses, status, firestore, students, firebase }) => {
  const [studentsSameStatus, setStudentsSameStatus] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleDelete = () => {
    setStudentsSameStatus([]);
    setModal(!modal);
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  const handleRemove = () => {
    for (let i = status.sort + 1; i <= statuses.length; i++) {
      statuses.forEach(el => {
        if (el.sort === i) {
          firestore
            .collection("statuses")
            .doc(el.id)
            .update({ sort: i - 1 })
            .catch(err => {
              alert(err.message);
            });
        }
      });
    }

    studentsSameStatus.forEach(student => {
      firestore
        .collection("deletedStudents")
        .doc(student.id)
        .set(student)
        .catch(err => {
          alert(err.message);
        });
    });

    studentsSameStatus.forEach(student => {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      storageRef
        .child(`studentsAvatar/${student.imageName}`)
        .delete()
        .then(function() {})
        .catch(function(error) {});

      firestore
        .collection("students")
        .doc(student.id)
        .delete()
        .catch(err => {
          alert(err.message);
        });
    });

    firestore
      .collection("statuses")
      .doc(status.id)
      .delete()
      .catch(err => {
        alert(err.message);
      });

    setModalEdit(false);
  };

  const areYouSure = status => {
    const studentsForDelete = students.filter(
      student => student.status === status.id
    );
    setStudentsSameStatus(studentsForDelete);
    setModal(true);
  };

  const handleSortSelect = e => {
    let sort = parseInt(e.target.value);
    firestore
      .collection("statuses")
      .doc(status.id)
      .update({ sort })
      .catch(err => {
        alert(err.message);
      });
    if (status.sort > sort) {
      for (let i = sort; i < status.sort; i++) {
        statuses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("statuses")
              .doc(el.id)
              .update({ sort: i + 1 })
              .catch(err => {
                alert(err.message);
              });
          }
        });
      }
    }
    if (status.sort < sort) {
      for (let i = status.sort + 1; i <= sort; i++) {
        statuses.forEach(el => {
          if (el.sort === i) {
            firestore
              .collection("statuses")
              .doc(el.id)
              .update({ sort: i - 1 })
              .catch(err => {
                alert(err.message);
              });
          }
        });
      }
    }
  };

  return (
    <div>
      <Card
        key={status.id}
        className="card"
        style={{ boxShadow: `0 0 15px ${status.color}` }}
      >
        <CardBody className="cardBody">
          <CardTitle
            style={{ backgroundColor: status.color }}
            className="cardTitle"
          >
            <Row className="roWW">
              <Col xs="10">
                <h5 className="white">{status.name}</h5>
              </Col>
              <Col xs="2" className="select">
                <Input
                  className="select selectSize"
                  bsSize="sm"
                  type="select"
                  value={status.sort}
                  onChange={handleSortSelect}
                >
                  {statuses.map(el => (
                    <option key={el.id} value={el.sort}>
                      {el.sort}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </CardTitle>
          <CardText className="cardText" style={{ color: `${status.color}` }}>
            <strong>{status.longName}</strong>
          </CardText>
          <div className="deleteEdit">
            {status.id !== "fc4a5a70-4739-11e9-8e2b-71e4e6f455b5" ? (
              <>
                <Button
                  size="sm"
                  color="danger"
                  className="float-right  mr-2"
                  onClick={() => {
                    areYouSure(status);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  color="success"
                  className="float-right mr-2"
                  onClick={() => setModalEdit(true)}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                color="success"
                className="float-right mr-1"
                onClick={() => setModalEdit(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <DeleteStatusModal
        modal={modal}
        toggle={toggleDelete}
        studentsSameStatus={studentsSameStatus}
        status={status}
        handleRemove={handleRemove}
      />

      <EditStatusModal
        modal={modalEdit}
        toggle={toggleEdit}
        status={status}
        students={students}
      />
    </div>
  );
};

export default withFirestore(Status);
