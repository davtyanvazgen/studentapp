import React, { useState } from "react";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { withFirestore } from "react-redux-firebase";

const EditCourseModal = ({ course, toggle, modal, firestore, students }) => {
  const [newName, setNewName] = useState(course.name);
  const [newLongName, setNewLongName] = useState(course.longName);

  const handleEditCourseName = e => {
    setNewName(e.target.value);
  };

  const handleEditCourseLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditCourse = newName => {
    if (newName.trim()) {
      const editCourse = {
        name: newName,
        longName: newLongName.trim(),
        id: course.id
      };

      firestore
        .collection("courses")
        .doc(course.id)
        .update({ ...editCourse })
        .catch(err => {
          alert(err.message);
        });

      students.forEach(student => {
        if (student.course === course.id) {
          firestore
            .collection("students")
            .doc(student.id)
            .update({ courseName: newLongName.trim() })
            .catch(err => {
              alert(err.message);
            });
        }
      });
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} className="editDeleteModal">
      <ModalHeader toggle={toggle}>ZVART Jan let's edit course</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <h5>Short Name</h5>
            <Input
              bssize="sm"
              value={newName}
              onChange={handleEditCourseName}
            />
            <br />
            <h5>Long Name</h5>
            <Input
              bssize="sm"
              value={newLongName}
              onChange={handleEditCourseLongName}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          onClick={() => {
            confirmEditCourse(newName);
            toggle();
          }}
        >
          Edit
        </Button>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default withFirestore(EditCourseModal);
