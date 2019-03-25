import React from "react";
import { ChromePicker } from "react-color";
import { Col } from "reactstrap";

export default class Picker extends React.Component {
  render() {
    return (
      <>
        <Col>
          <ChromePicker
            color={this.props.background}
            onChangeComplete={this.props.handleChangeComplete}
          />
        </Col>
      </>
    );
  }
}
