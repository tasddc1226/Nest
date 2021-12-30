import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function SignUpPage(props) {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (evnet) => {
    setPassword(evnet.currentTarget.value);
  };

  const onConfirmPasswordHandler = (evnet) => {
    setConfirmPassword(evnet.currentTarget.value);
  };

  const onSubmitHandler = (evnet) => {
    evnet.preventDefault(); // page refresh 막아주기

    if (Password !== ConfirmPassword) {
      return alert('비밀번호가 다릅니다.')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(signupUser(body)).then((response) => {
      if(response.payload.success) {
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        navigate('/login');
      } else {
        alert('이미 존재하는 회원입니다.');
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage;
