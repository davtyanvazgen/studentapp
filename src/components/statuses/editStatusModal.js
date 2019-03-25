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

const EditStatusModal = ({ status, toggle, modal, firestore, students }) => {
  const [newName, setNewName] = useState(status.name);
  const [newLongName, setNewLongName] = useState(status.longName);

  const handleEditStatusName = e => {
    setNewName(e.target.value);
  };

  const handleEditStatusLongName = e => {
    setNewLongName(e.target.value);
  };

  const confirmEditStatus = newName => {
    if (newName.trim()) {
      const editStatus = {
        name: newName,
        longName: newLongName.trim(),
        id: status.id
      };

      firestore
        .collection("statuses")
        .doc(status.id)
        .update({ ...editStatus })
        .catch(err => {
          alert(err.message);
        });

      students.forEach(student => {
        if (student.status === status.id) {
          firestore
            .collection("students")
            .doc(student.id)
            .update({ statusName: newLongName.trim() })
            .catch(err => {
              alert(err.message);
            });
        }
      });
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} className="editDeleteModal">
      <ModalHeader toggle={toggle}>ZVART Jan let's edit Status</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <h5>Short Name</h5>
            <Input
              bssize="sm"
              value={newName}
              onChange={handleEditStatusName}
            />
            <br />
            <h5>Long Name</h5>
            <Input
              bssize="sm"
              value={newLongName}
              onChange={handleEditStatusLongName}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          onClick={() => {
            confirmEditStatus(newName);
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
export default withFirestore(EditStatusModal);
