import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

export default function EditStudent({
  fullName,
  comment,
  phone,
  email,
  handleFullnameInput,
  handleEmailInput,
  handlePhoneInput,
  handleCommentInput,
  editStudent,
  toggle,
  modal
}) {
  return (
    <Modal isOpen={modal} toggle={toggle} className="studentModal">
      <ModalHeader> Edit Information</ModalHeader>
      <ModalBody>
        <h5>Edit Fullname</h5>
        <Input value={fullName} onChange={handleFullnameInput} />
        <br />
        <h5>Edit Email</h5>
        <Input value={email} onChange={handleEmailInput} />
        <br />
        <h5>Edit Phone number</h5>
        <Input value={phone} onChange={handlePhoneInput} />
        <br />
        <h5>Comment about this student</h5>
        <Input value={comment} onChange={handleCommentInput} />
        <br />
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={editStudent}>
          Edit
        </Button>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
