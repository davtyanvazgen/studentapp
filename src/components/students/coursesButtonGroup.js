import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Badge, Button } from "reactstrap";

const CoursesButton = ({
  selectedCourses,
  courses,
  courseStudents,
  students
}) => {
  const [rSelected, setSelected] = useState([...selectedCourses]);
  function onCheckboxBtnClick(selected) {
    let tempArr = rSelected;
    const index = tempArr.indexOf(selected);
    if (index < 0) {
      tempArr.push(selected);
    } else {
      tempArr.splice(index, 1);
    }
    setSelected(tempArr);
  }

  function studentSameCourse(course) {
    let counter = 0;
    students.forEach(student => {
      if (student.course === course.id) {
        counter++;
      }
    });
    return counter;
  }
  return (
    <div className="buttons">
      {courses.length
        ? courses.map(course => (
            <Button
              className="activeButtonColor courseButton"
              style={{
                backgroundColor: course.color,
                borderColor: course.color
              }}
              id={course.id}
              key={course.id}
              onClick={() => {
                onCheckboxBtnClick(course.id);
                courseStudents(undefined, course);
              }}
              active={rSelected.includes(course.id)}
            >
              <span>
                {course.name}
                <Badge className="courseCount" color="secondary">
                  {students && studentSameCourse(course)}
                </Badge>
              </span>
            </Button>
          ))
        : null}
    </div>
  );
};

export default compose(
  firestoreConnect(() => [
    { collection: "students", orderBy: "date" },
    { collection: "courses", orderBy: "sort" }
  ]),
  connect((state, props) => ({
    students: state.firestore.ordered.students,
    courses: state.firestore.ordered.courses,
    selectedCourses: state.filter.selectedCourses
  }))
)(CoursesButton);
