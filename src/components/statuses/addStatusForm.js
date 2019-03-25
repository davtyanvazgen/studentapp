import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";
import Picker from "./picker";

const AddStatusForm = ({ statuses, firestore }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [background, setBackground] = useState("#197FD2");
  const [checkLetters, setCheckLetters] = useState("");

  function handleChangeComplete(color) {
    setBackground(color.hex);
    console.log(color.hex, typeof color.hex);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLongName(e) {
    setLongName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() && name.length <= 10) {
      const newStatus = {
        id: v1(),
        longName: longName.trim() || name,
        name,
        color: background,
        sort: statuses.length + 1
      };

      firestore
        .collection("statuses")
        .doc(newStatus.id)
        .set(newStatus)
        .catch(err => {
          alert(err.message);
        });

      setName("");
      setLongName("");
      setCheckLetters("");
    } else {
      setCheckLetters("Maximum length 10 letters.");
    }
  }

  return (
    <>
      <Col md={{ size: "3", offset: 3 }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {!checkLetters ? (
              <Label>Short name</Label>
            ) : (
              <Label className="label">{checkLetters}</Label>
            )}
            <Input
              type="text"
              placeholder="Enter short name of status"
              value={name}
              onChange={handleChangeName}
            />
            <Label>Long name</Label>
            <Input
              type="text"
              placeholder="Enter long name of status"
              value={longName}
              onChange={handleChangeLongName}
            />
            <Button id="prev" type="submit" />
          </FormGroup>
        </Form>
        <Button
          className="mr-2"
          size="sm"
          style={{ backgroundColor: `${background}`, border: "none" }}
        >
          {name ? name : "Short name"}
        </Button>

        <Button
          size="sm"
          style={{ backgroundColor: `${background}`, border: "none" }}
        >
          {longName ? longName : "Long name"}
        </Button>
        <hr />
        <Button
          size="sm"
          type="submit"
          color="success"
          block
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Col>

      <Col md="3">
        <Picker
          handleChangeComplete={handleChangeComplete}
          name={name}
          longName={longName}
          background={background}
        />
      </Col>
    </>
  );
};

export default withFirestore(AddStatusForm);
