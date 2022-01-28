import React, { Component } from "react";
import { FaRegSmile } from "react-icons/fa";
import firebase from "../../../firebase";
import { connect } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../../redux/actions/chatRoom_action";

export class DirectMessages extends Component {
  state = {
    usersRef: firebase.database().ref("users"),
    users: [],
    activeChatRoom: "",
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUsersListeners(this.props.user.uid);
    }
  }

  // 자신을 제외한 모든 회원가입된 유저의 정보에 대한 리스너 함수
  addUsersListeners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];
    usersRef.on("child_added", (DataSnapshot) => {
      if (currentUserId !== DataSnapshot.key) {
        let user = DataSnapshot.val();
        user["uid"] = DataSnapshot.key;
        user["status"] = "offline";
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  // 상대방과 나의 id를 비교하여 같은 방 id를 생성하기 위한 함수
  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid;

    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  setActiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };

    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setActiveChatRoom(user.uid);
  };

  renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.uid}
        style={{
          backgroundColor:
            user.uid === this.state.activeChatRoom && "#ffffff45",
        }}
        onClick={() => this.changeChatRoom(user)}
      >
        # {user.name}
      </li>
    ));

  render() {
    // console.log("가입된 유저들 ", this.state.users);
    const { users } = this.state;
    return (
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGES(1)
        </span>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.renderDirectMessages(users)}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(DirectMessages);
