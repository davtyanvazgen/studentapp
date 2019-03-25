import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Col } from "reactstrap";

const StatusesButton = ({ statuses, selectedStatuses, statusStudents }) => {
  const [rSelected, setSelected] = useState(selectedStatuses[0]);

  const onRadioBtnClick = selected => {
    setSelected(selected);
  };

  return (
    <>
      <Col>
        <Button
          color="dark"
          onClick={() => {
            onRadioBtnClick("all");
            statusStudents(undefined, undefined, "all");
          }}
          active={rSelected === "all"}
          className="statusButton"
        >
          Show all
        </Button>
      </Col>
      {statuses.length
        ? statuses.map(status => (
            <Col key={status.id}>
              <Button
                className="activeButtonColor statusButton"
                style={{
                  backgroundColor: status.color,
                  borderColor: status.color
                }}
                color="dark"
                id={status.id}
                key={status.id}
                onClick={() => {
                  onRadioBtnClick(status.id);
                  statusStudents(undefined, undefined, status);
                }}
                active={rSelected === status.id}
              >
                {status.name}
              </Button>
            </Col>
          ))
        : null}
    </>
  );
};

export default compose(
  firestoreConnect(() => [
    { collection: "students", orderBy: "date" },
    { collection: "statuses", orderBy: "sort" }
  ]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    selectedStatuses: state.filter.selectedStatuses
  }))
)(StatusesButton);
