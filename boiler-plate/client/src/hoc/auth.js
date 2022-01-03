import { Axios } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

export default function (SpecificComponent, option, adminRoute = null) {
  // null => 아무나 출입 가능 페이지
  // true => 로그인한 유저만 출입 가능 페이지
  // false => 로그인한 유저는 출입 불가능 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.log(response)

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            alert("접근 권한이 없습니다!!");
            props.history.push("/");
          } else {
            if (option === false) {
              alert("이미 로그인 되어있습니다!");
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
