import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/users/signin", dataTosubmit)
    .then((response) => response.data);

  return {
    // 받은 request를 Reducer로 넘겨줌
    type: LOGIN_USER,
    payload: request,
  };
}
