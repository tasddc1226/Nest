import React, { Component } from "react";
import { FaRegSmileWink, FaPlus } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "../../../firebase";
import { connect } from "react-redux";

export class ChatRooms extends Component {
  state = {
    show: false,
    name: "",
    description: "",
    chatRoomsRef: firebase.database().ref("chatRooms"),
    chatRooms: [],
    firstLoad: true,
    activeChatRoomId: "",
  };

  componentDidMount() {
    this.AddChatRoomsListeners();
  }

  //
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  // 방 생성하기 버튼에 대한 handle 함수
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  };

  // 입력한 방 정보가 있는지 유효성 check 함수
  isFormValid = (name, description) => name && description;

  setFirstChatRoom = () => {};

  // 대화방 추가에 대한 리스너 함수로 firebase에 저장된 데이터를 실시간으로 받을 수 있음
  AddChatRoomsListeners = () => {
    let chatRoomsArray = [];

    // Chat Rooms table에 데이터가 들어오면..
    this.state.chatRoomsRef.on("child_added", (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      // console.log("chatRoomsArray", chatRoomsArray);
      this.setState({ chatRooms: chatRoomsArray }, () =>
        this.setFirstChatRoom()
      );
    });
  };

  // 대화방을 생성하는 함수
  addChatRoom = async () => {
    // 자동으로 생성된 key값을 저장하기 위해
    const key = this.state.chatRoomsRef.push().key;
    const { name, description } = this.state;
    const { user } = this.props; // 방을 생성한 user 정보
    const newChatRoom = {
      id: key,
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };

    // 생성된 ChatRoom을 firebase에 저장하기
    try {
      await this.state.chatRoomsRef.child(key).update(newChatRoom);
      this.setState({
        name: "",
        description: "",
        show: false,
      });
    } catch (error) {
      alert(error);
    }
  };

  // 현재 존재하는 모든 대화방을 rendering 하는 함수
  renderChatRooms = (chatRooms) =>
    chatRooms.length > 0 &&
    chatRooms.map((room) => <li key={room.id}># {room.name}</li>);

  render() {
    return (
      <div>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHAT ROOMS (1)
          <FaPlus
            onClick={this.handleShow}
            style={{
              position: "absolute",
              right: 0,
              cursor: "pointer",
            }}
          />
        </div>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.renderChatRooms(this.state.chatRooms)}
        </ul>

        {/* ADD CHAT ROOM MODAL */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>채팅방 만들기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>방 이름</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room name"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>방 설명</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  type="text"
                  placeholder="Enter a chat room description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              방 생성하기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// State에 들어있는 정보를 props로 바꿔서 사용하겠다.
// class 컴포넌트에서는 아래와 같이 props로 정보를 받아올 수 있다.
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(ChatRooms);
