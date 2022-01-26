import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { RiLockUnlockLine } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

// 부모의 trigger 함수를 인자로 받아옴
function MessageHeader({ handleSearchChange }) {
  return (
    <div
      style={{
        width: "100%",
        height: "170px",
        border: ".2rem solid #ececec",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h2>
              <RiLockUnlockLine />
              &nbsp;채팅방 이름&nbsp;
              <MdFavorite />
            </h2>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>
              <FormControl
                // 부모 trigger 함수 사용
                onChange={handleSearchChange}
                placeholder="대화 내용 검색"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p>
            <Image src="" /> user name
          </p>
        </div>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{ padding: "0 1rem" }}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Description
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{ padding: "0 1rem" }}>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Posts Count
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageHeader;
