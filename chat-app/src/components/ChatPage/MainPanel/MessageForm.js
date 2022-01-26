import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../../../firebase";
import { useSelector } from "react-redux";
import mime from "mime-types";
function MessageForm() {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>

      <ProgressBar
        variant="warning"
        label="60%"
        now={60}
        // label={`${percentage}%`}
        // now={percentage}
      />

      <Row>
        <Col>
          <button
            // onClick={handleSubmit}
            className="message-form-button"
            style={{ width: "100%" }}
            // disabled={loading ? true : false}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button
            // onClick={handleOpenImageRef}
            className="message-form-button"
            style={{ width: "100%" }}
            // disabled={loading ? true : false}
          >
            UPLOAD
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
