import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ednaDelete from "../../images/ednaDelete.jpg";

export default class DeleteCourseModal extends Component {
  render() {
    const {
      studentsSameCourse,
      course,
      handleRemove,
      modal,
      toggle
    } = this.props;

    const body = studentsSameCourse.length ? (
      <>
        <h4>
          There are <b>{studentsSameCourse.length}</b> Students with{" "}
          <b>{course.name}</b>
        </h4>
        <p>
          if you delete this course you will lose{" "}
          <b>{studentsSameCourse.length}</b> friends
        </p>
      </>
    ) : (
      <h6>Do you want to delete this course ?</h6>
    );

    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} className="editDeleteModal">
          <ModalHeader toggle={toggle}>
            <img src={ednaDelete} alt="edna" style={{ width: "100%" }} />
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
      </div>
    );
  }
}
