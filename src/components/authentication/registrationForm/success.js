import React from "react";
import "../../styles/authentication.css";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import edna from "../../../images/edna.png";

const Success = props => {
  return (
    <div>
      <Modal isOpen={props.open} id="regModal">
        <ModalBody>
          <>
            <img id="regModalBody" src={edna} alt="edna superhero" />
          </>
        </ModalBody>
        <ModalFooter>
          <Link to="/studentapp">
            <Button color="primary" onClick={props.toggleSuccess}>
              Close
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Success;
