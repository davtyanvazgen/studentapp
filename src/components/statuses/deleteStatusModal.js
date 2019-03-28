import React, { Component } from "react";
import "../styles/courseAndStatusCard.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ednaDes from "../../images/ednaDes.jpg";

export default class DeleteStatusModal extends Component {
  render() {
    const {
      studentsSameStatus,
      status,
      handleRemove,
      modal,
      toggle
    } = this.props;

    const body = studentsSameStatus.length ? (
      <>
        <h4>
          <b>{status.name}</b> has <b>{studentsSameStatus.length}</b> member(s).
        </h4>
        <p>Are you sure ?</p>
      </>
    ) : (
      <h6>Do you want to delete this status ?</h6>
    );

    return (
      <Modal isOpen={modal} toggle={toggle} className="editDeleteModal">
        <ModalHeader toggle={toggle}>
          <img src={ednaDes} alt="edna" style={{ width: "100%" }} />
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Delete
          </Button>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
