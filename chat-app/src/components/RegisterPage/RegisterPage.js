import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const [errorFromSubmit, seterrorFromSubmit] = useState("");

  console.log(watch("email"));
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Register</h3>
      </div>
      <form>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This field is required</p>}

        <label>Name</label>
        <input name="name" />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label>Password</label>
        <input name="password" type="password" />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label>Password Confirm</label>
        <input name="password_confirm" type="password" />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" />
        <Link style={{ color: "gray", textDecoration: "none" }} to="login">
          이미 회원이신가요?
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
