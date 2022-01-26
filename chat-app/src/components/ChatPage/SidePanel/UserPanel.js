import React from "react";
import { RiWechatLine } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import firebase from "../../../firebase";
function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      {/* Logo */}
      <h2 style={{ color: "white", fontWeight: "bold" }}>
        <RiWechatLine /> Sleact
      </h2>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30p", height: "30px", marginTop: "3px" }}
          roundedCircle
        ></Image>
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
