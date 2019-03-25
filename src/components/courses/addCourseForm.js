import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { withFirestore } from "react-redux-firebase";
import { v1 } from "uuid";

const AddCourseForm = ({ firestore, courses }) => {
  const [name, setName] = useState("");
  const [longName, setLongName] = useState("");
  const [color, setColor] = useState("#D219AD");
  const [checkLetters, setCheckLetters] = useState("");

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeLongName = e => {
    setLongName(e.target.value);
  };

  const generateColor = () => {
    const colors = [
      "#001f3f",
      "#0074D9",
      "#7FDBFF",
      "#39CCCC",
      "#3D9970",
      "#2ECC40",
      "#01FF70",
      "#FFDC00",
      "#FF851B",
      "#FF4136",
      "#85144b",
      "#F012BE",
      "#B10DC9",
      "#4a569d",
      "#ffe47a",
      "#757F9A",
      "#d7dde8",
      "#5C258D",
      "#71B280",
      "#8E54E9"
    ];
    const random = Math.floor(Math.random() * 20);
    setColor(colors[random]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() && name.length <= 10) {
      const newCourse = {
        id: v1(),
        longName: longName.trim() || name,
        name,
        color,
        sort: courses.length + 1
      };

      firestore
        .collection("courses")
        .doc(newCourse.id)
        .set(newCourse)
        .catch(err => {
          alert(err.message);
        });

      firestore.collection("courses").orderBy("sort");

      setName("");
      setLongName("");
      setCheckLetters("");
    } else {
      setCheckLetters("Maximum length 10 letters.");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="addCourse">
        <FormGroup>
          {!checkLetters ? (
            <Label>Short name</Label>
          ) : (
            <Label className="label ">{checkLetters}</Label>
          )}
          <Input
            type="text"
            placeholder="Enter short name"
            value={name}
            onChange={handleChangeName}
          />

          <Label>Long name</Label>
          <Input
            type="text"
            placeholder="Enter long name"
            value={longName}
            onChange={handleChangeLongName}
          />
        </FormGroup>
      </Form>

      <Button size="sm" style={{ backgroundColor: color }} className="mr-2">
        {name ? name : "Short name"}
      </Button>

      <Button size="sm" style={{ backgroundColor: color }}>
        {longName ? longName : "Long name"}
      </Button>

      <Button
        className="float-right"
        type="submit"
        color="info"
        size="sm"
        onClick={generateColor}
      >
        Generate color
      </Button>
      <hr />

      <Button
        onClick={handleSubmit}
        type="submit"
        color="success"
        block
        size="sm"
      >
        Add
      </Button>
    </>
  );
};

export default withFirestore(AddCourseForm);
