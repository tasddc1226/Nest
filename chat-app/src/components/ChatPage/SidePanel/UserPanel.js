import React, { useRef } from "react";
import { RiWechatLine } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../firebase";
import mime from "mime-types";
import { setPhotoURL } from "../../../redux/actions/user_action";

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();
  const dispatch = useDispatch();

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    // file data를 가져옴
    const file = event.target.files[0];
    // console.log(file);
    // file의 metadata를 추출 : mime-type 모듈 사용
    // lookup 함수에 파라메터로 파일 이름을 넣어준다.
    const metadata = { contentType: mime.lookup(file.name) };

    try {
      // firebase Storage에 저장
      let uploadTaskSnapShot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);

      let downloadURL = await uploadTaskSnapShot.ref.getDownloadURL();

      // User의 이미지를 변경
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });

      // Redux에서 User 이미지 교체
      dispatch(setPhotoURL(downloadURL));

      // 데이터베이스 유저 이미지 수정
      await firebase
        .database()
        .ref("users")
        .child(user.uid)
        .update({ image: downloadURL })
        .then(alert("프로필 사진 변경 완료"));
    } catch (error) {
      alert(error);
    }
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
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
            {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        ref={inputOpenImageRef}
        type="file"
      />
    </div>
  );
}

export default UserPanel;
