import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import FormikControl from "../../components/shared/Formik/FormikControl";
import Modal from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { signupRequest } from "./SignupSlice";
import { useDispatch } from "react-redux";
import "./Signup.css";

function Signup() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const dispatch = useDispatch();

  const userRoles = [
    { key: "Choose your role", value: "" },
    { key: "Reader", value: "user" },
    { key: "Author", value: "author" },
  ];

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  const validationSchema = yup.object({
    username: yup.string().required("Required!"),
    email: yup.string().email("Invalid Email Format!").required("Required!"),
    password: yup.string().required("Required!"),
    confirmPassword: yup
      .string()
      .required("Required!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
    role: yup.string().required("Required!"),
  });

  const onSubmit = async (values) => {
    console.log("Form Data", values);
    const user = await dispatch(signupRequest(values));
    if (user.payload) {
      navigate("/login", { replace: true });
    }
  };
  return (
    <>
      {isOpenModal ? (
        <Modal isOpenModal={isOpenModal} setisOpenModal={setisOpenModal} />
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="signup-form">
              <h2 className="signup-title">Signup</h2>
              <FormikControl
                control="input"
                label="User Name"
                type="text"
                name="username"
                touched={formik.touched.username}
                error={formik.errors.username}
              />
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
              <FormikControl
                control="input"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                touched={formik.touched.confirmPassword}
                error={formik.errors.confirmPassword}
              />
              <FormikControl
                control="select"
                label="Role"
                name="role"
                touched={formik.touched.role}
                error={formik.errors.role}
                options={userRoles}
              />

              <button type="submit" disabled={!formik.isValid}>
                Signup
              </button>
              <div className="signup-form__hr"></div>
              <Link className="signup-form__login" to="/login">
                Already have an account? Log in
              </Link>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Signup;
