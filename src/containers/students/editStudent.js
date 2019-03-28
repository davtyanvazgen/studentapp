import React, { useState } from "react";
import { withFirestore } from "react-redux-firebase";
import EditStudent from "../../components/students/editStudent";

function EditStudentModal(props) {
  const [fullName, setFullName] = useState(`${props.student.fullName}`);
  const [email, setEmail] = useState(props.student.email);
  const [phone, setPhone] = useState(props.student.phone);
  const [comment, setComment] = useState(props.student.comment);

  const handleFullnameInput = e => {
    setFullName(e.target.value);
  };
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  const handlePhoneInput = e => {
    setPhone(e.target.value);
  };
  const handleCommentInput = e => {
    setComment(e.target.value);
  };

  const editStudent = () => {
    props.firestore
      .collection("students")
      .doc(props.student.id)
      .update({
        fullName: fullName.toUpperCase(),
        phone,
        email,
        comment
      })
      .catch(err => {
        alert(err.message);
      });

    props.toggle();
  };

  return (
    <EditStudent
      fullName={fullName}
      email={email}
      phone={phone}
      comment={comment}
      handleEmailInput={handleEmailInput}
      handleCommentInput={handleCommentInput}
      handleFullnameInput={handleFullnameInput}
      handlePhoneInput={handlePhoneInput}
      editStudent={editStudent}
      toggle={props.toggle}
      modal={props.modal}
    />
  );
}

export default withFirestore(EditStudentModal);
