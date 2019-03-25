import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ednaStDel from "../../images/ednaStDel.jpg";

class DeleteStudentModal extends React.Component {
  render() {
    const { modal, toggleDeleteStudent, student, handleRemove } = this.props;
    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={toggleDeleteStudent}
          className="studentModal"
        >
          <ModalHeader toggle={toggleDeleteStudent}>
            <img src={ednaStDel} alt="edna" style={{ width: "100%" }} />
          </ModalHeader>
          <ModalBody>
            You want to delete <b>{student}</b>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleRemove}>
              Delete
            </Button>
            <Button color="primary" onClick={toggleDeleteStudent}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteStudentModal;
