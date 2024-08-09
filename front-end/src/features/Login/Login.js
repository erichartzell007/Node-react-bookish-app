import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginRequest } from "./LoginSlice";
import FormikControl from "../../components/shared/Formik/FormikControl";
import Modal from "../Modal/Modal";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email Format!").required("Required!"),
    password: yup.string().required("Required!"),
  });

  const onSubmit = async (values) => {
    const user = await dispatch(loginRequest(values));
    console.log("loginRequest:", user);
    if (user) {
      navigate("/");
      // setmodalMessage(`Welcome ${user.payload.username}!`);
      // setisOpenModal(true);
    }
  };
  return (
    <>
      {isOpenModal ? (
        <Modal
          isOpenModal={isOpenModal}
          setisOpenModal={setisOpenModal}
          modalMessage={modalMessage}
          setmodalMessage={setmodalMessage}
        />
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="login-form">
              <h2 className="login-title">Login</h2>
              <FormikControl
                control="input"
                label="Email"
                type="email"
                name="email"
                touched={formik.touched.email}
                error={formik.errors.email}
              />
              <FormikControl
                control="input"
                label="Password"
                type="password"
                name="password"
                touched={formik.touched.password}
                error={formik.errors.password}
              />
              <button type="submit" disabled={!formik.isValid}>
                Login
              </button>
              <div className="login-form__hr"></div>
              <Link className="login-form__signup" to="/signup">
                Don't have an account? Sign up
              </Link>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Login;
