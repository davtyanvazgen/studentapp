import React, { useState } from "react";
import CoursesButtonGroup from "./coursesButtonGroup";
import StatusesButton from "./statusesButtonGroup";
import StudentCard from "./studentCard";
import Input from "reactstrap/es/Input";
import "../styles/studentsList.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Students = ({
  filterStudents,
  searchValue,
  students,
  allStudents,
  courses,
  statuses,
  background,
  page,
  onPageClick
}) => {
  const [rSelected, setSelected] = useState(page);

  const onRadioBtnClick = selected => {
    setSelected(selected);
  };
  if (students && courses && statuses) {
    const pages = [];
    for (let i = 1; i <= Math.ceil(students.length / 10); i++) {
      pages.push(i);
    }
    return (
      <>
        <Container className="mainContainer">
          <Row>
            <Col sm={{ size: 10, offset: 2 }} className="column">
              <Container>
                <Row>
                  <Col>
                    <h5 className="count">
                      All students count: <strong>{allStudents.length}</strong>
                    </h5>
                  </Col>
                  <Col>
                    <InputGroup className="searchInput">
                      <Input
                        value={searchValue}
                        onChange={e =>
                          filterStudents(e.target.value.toUpperCase())
                        }
                      />
                      <InputGroupAddon addonType="append">
                        Search
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className="buttonsCol" xs="auto">
                    <CoursesButtonGroup courseStudents={filterStudents} />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row>
            <Col xs={{ size: 2 }} className="colpadding">
              <StatusesButton statusStudents={filterStudents} />
            </Col>

            <Col xs={{ size: 10 }}>
              <Container className="studentsContainer">
                <Row>
                  <ListGroup className="listGroup">
                    {students &&
                      students.map((student, i) => {
                        background === "#ffffff"
                          ? (background = "#fbfbfb")
                          : (background = "#ffffff");
                        if (i < page * 10 && i >= (page - 1) * 10) {
                          return (
                            <StudentCard
                              background={background}
                              key={student.id}
                              student={student}
                              filterStudents={filterStudents}
                            />
                          );
                        }
                        return null;
                      })}
                  </ListGroup>

                  <div className="listGroup">
                    {!students.length && (
                      <div>
                        <div className="jumbotron">
                          <Container>
                            <h1> No students</h1>
                            <p>There is no student at this time.</p>
                          </Container>
                        </div>
                      </div>
                    )}
                  </div>
                </Row>
              </Container>
              {students && students.length > 10 && (
                <ListGroup className="listGroup">
                  <div className="pagination">
                    <Button
                      className="arrow"
                      onClick={() => {
                        onRadioBtnClick(pages[0]);
                        onPageClick(pages[0]);
                      }}
                    >
                      <FontAwesomeIcon icon="arrow-left" />
                    </Button>
                    {pages.map(p => (
                      <Button
                        key={p}
                        color="dark"
                        onClick={() => {
                          onRadioBtnClick(p);
                          onPageClick(p);
                        }}
                        active={rSelected === p}
                      >
                        <span key={p}> {p} </span>
                      </Button>
                    ))}
                    <Button
                      className="arrow"
                      onClick={() => {
                        onRadioBtnClick(pages[pages.length - 1]);
                        onPageClick(pages[pages.length - 1]);
                      }}
                    >
                      <FontAwesomeIcon icon="arrow-right" />
                    </Button>
                  </div>
                </ListGroup>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container className="mainContainer">
          <div className="lds-hourglass" />
        </Container>
      </>
    );
  }
};

export default Students;
library.add(faArrowLeft, faArrowRight);
