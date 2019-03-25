import React, { useState } from "react";
import "../../styles/authentication.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { v1 } from "uuid";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Success from "./success";

const RegistrationForm = props => {
  const name = useFormInput("");
  const surname = useFormInput("");
  const phone = useFormInput("");
  const email = useFormInput("");
  const [pathImage, setpahtImage] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [nameValidationError, setNameValidationError] = useState("");
  const [surNameValidationErrors, setSurNameValidationErrors] = useState("");
  const [emailValidationErrors, setEmailValidationErrors] = useState("");
  const [phoneValidationErrors, setPhoneValidationErrors] = useState("");
  const [knowledgeValidationErrors, setKnowledgeValidationErrors] = useState(
    ""
  );
  const [
    selectCourseValidationErrors,
    setSelectCourseValidationErrors
  ] = useState("");
  const [open, setOpen] = useState(false);

  const toggleSuccess = () => {
    setOpen(!open);
  };

  function hanldeSelectKnowledge(e) {
    setKnowledge(e.target.value);
  }

  function hanldeSelectLesson(e) {
    let course = JSON.parse(e.target.value);
    setSelectedCourse(course.longName);
    setSelectedCourseId(course.id);
  }

  function selectImage(e) {
    let value = e.target.value;
    setpahtImage(value);
  }

  function handeleCreateStudent() {
    const id = v1();
    const date = new Date();
    if (validation()) {
      const defaultStatus = props.statuses.find(
        el => el.id === "a96b5820-4e52-11e9-b219-e1513e786dc2"
      );
      let student = {
        fullName: name.value.toUpperCase() + " " + surname.value.toUpperCase(),
        phone: phone.value,
        email: email.value,
        status: defaultStatus.id,
        statusName: defaultStatus.longName,
        courseName: selectedCourse,
        course: selectedCourseId,
        id: id,
        date: date,
        knowledge,
        comment: "",
        url:
          "https://i.pinimg.com/originals/02/f3/87/02f38779c48e8880536a51c309227c8c.gif"
      };
      if (pathImage) {
        const ref = props.firebase.storage().ref("studentsAvatar");
        const file = document.querySelector("#file").files[0];
        const name = +new Date() + "-" + file.name;
        const metadata = { contentType: file.type };
        const task = ref.child(name).put(file, metadata);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(url => {
            student.url = url;
            student.imageName = name;
            props.firestore
              .collection("students")
              .doc(student.id)
              .set(student)
              .then(() => {
                toggleSuccess();
              })
              .catch(err => {
                alert(err.message);
              });
          })
          .catch(err => {
            alert(err.message);
          });
      } else {
        props.firestore
          .collection("students")
          .doc(student.id)
          .set(student)
          .then(() => {
            toggleSuccess();
          })
          .catch(err => {
            alert(err.message);
          });
      }
    } else {
      return false;
    }
  }

  function validation() {
    const validator = require("validator");
    const nameErrors = validator.isAlpha(name.value);
    !nameErrors
      ? setNameValidationError("Have to be letters")
      : setNameValidationError("");
    const surNameErrors = validator.isAlpha(surname.value);
    !surNameErrors
      ? setSurNameValidationErrors("Have to be letters")
      : setSurNameValidationErrors("");
    const emailErrors = validator.isEmail(email.value);
    !emailErrors
      ? setEmailValidationErrors("Wrong email")
      : setEmailValidationErrors("");
    const phoneErrors =
      validator.isInt(phone.value) &&
      validator.isLength(phone.value, { min: 8, max: 13 });
    !phoneErrors
      ? setPhoneValidationErrors("Wrong number")
      : setPhoneValidationErrors("");

    let knowledgeErrors;
    if (!knowledge) {
      setKnowledgeValidationErrors("choose your level ");
      knowledgeErrors = false;
    } else {
      setKnowledgeValidationErrors("");
      knowledgeErrors = true;
    }

    let courseErrors;
    if (!selectedCourse) {
      setSelectCourseValidationErrors("choose Lesson");
      courseErrors = false;
    } else {
      setSelectCourseValidationErrors("");
      courseErrors = true;
    }

    if (
      nameErrors &&
      surNameErrors &&
      emailErrors &&
      phoneErrors &&
      knowledgeErrors &&
      courseErrors
    ) {
      return true;
    }

    return false;
  }

  return (
    <>
      <div id="container">
        <div className="miniContainer">
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input {...name} type="text" name="name" />
              {nameValidationError && (
                <p className="regError">{nameValidationError}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input {...surname} type="text" name="surname" />
              {surNameValidationErrors && (
                <p className="regError">{surNameValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input {...email} type="email" name="email" />
              {emailValidationErrors && (
                <p className="regError">{emailValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Phone</Label>
              <Input
                {...phone}
                placeholder="+374-00-00-00-00"
                type="text"
                name="phone"
              />
              {phoneValidationErrors && (
                <p className="regError">{phoneValidationErrors}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Select Lesson</Label>
              <Input
                type="select"
                name="select"
                id="select"
                defaultValue={1}
                onChange={hanldeSelectLesson}
              >
                <option value={1} disabled>
                  --Choose Lesson--
                </option>
                {props.courses &&
                  props.courses.map(course => (
                    <option key={course.id} value={JSON.stringify(course)}>
                      {course.longName}
                    </option>
                  ))}
              </Input>

              {selectCourseValidationErrors && (
                <p className="regError">{selectCourseValidationErrors}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label>It knowledge Level</Label>
              <Input
                defaultValue={1}
                type="select"
                name="select"
                id="select"
                onChange={hanldeSelectKnowledge}
              >
                <option value={1} disabled>
                  --Choose knowledge--
                </option>
                <option>Beginner</option>
                <option>Know basics some programming language</option>
                <option>Know enough some programming language</option>
                <option>
                  Good at some programming language and have experience
                </option>
                option>
              </Input>
              {knowledgeValidationErrors && (
                <p className="regError">{knowledgeValidationErrors}</p>
              )}
            </FormGroup>
            <FormGroup>
              <input
                type="file"
                name="file"
                id="file"
                className="inputfile"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={selectImage}
              />
              <div className="photo">
                <label htmlFor="file">Choose a photo</label>
              </div>
              <p className="clip">{pathImage}</p>
            </FormGroup>

            <Button
              color="success"
              block
              onClick={() => {
                handeleCreateStudent();
              }}
            >
              Registration
            </Button>
          </Form>
        </div>
        <Success open={open} toggleSuccess={toggleSuccess} />
      </div>
    </>
  );

  function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function handlechange(e) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handlechange
    };
  }
};

export default compose(
  firestoreConnect(() => ["statuses", "courses"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    courses: state.firestore.ordered.courses
  }))
)(RegistrationForm);
