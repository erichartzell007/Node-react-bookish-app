import { Form, Formik, replace } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "./BookSlice";
import * as yup from "yup";
import FormikControl from "../../components/shared/Formik/FormikControl";
import Modal from "../Modal/Modal";
import jwtDecode from "jwt-decode";
import "./AddBookForm.css";

function AddBookForm() {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");

  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("User in FORM:", user);

  const initialValues = {
    title: "",
    file: null,
    description: "",
    publishedDate: "",
    authorId: jwtDecode(user.token)._id,
  };
  const validationSchema = yup.object({
    title: yup.string().required("Required!"),
    description: yup
      .string()
      .required("Required!")
      .min(10, "Decription must contain atleast 10 characters!"),
    publishedDate: yup.date().required("Required!"),
    authorId: yup.string(),
  });

  const onSubmit = async (values) => {
    console.log("Values:", values);
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("publishedDate", values.publishedDate);
    formData.append("authorId", values.authorId);
    const res = await dispatch(addBook(formData)).unwrap();
    console.log({ res });
    if (!res.message) {
      setmodalMessage("Book not uploaded!");
    } else {
      setmodalMessage(res.message);
      setTimeout(() => {
        setmodalMessage("");
        setisOpenModal(false);
        navigate("/", { replace: true });
      }, 3000);
    }
    setisOpenModal(true);
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
            <Form className="addbook-form" encType="multipart/form-data">
              <h2 className="addbook-title">Add New Book</h2>
              <FormikControl
                control="input"
                label="Title"
                type="text"
                name="title"
                touched={formik.touched.title}
                error={formik.errors.title}
              />

              <FormikControl
                control="input"
                label="Upload"
                type="file"
                value={undefined}
                accept=".pdf"
                name="file"
                touched={formik.touched.file}
                error={formik.errors.file}
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <FormikControl
                as="textarea"
                control="input"
                label="Description"
                type="text"
                name="description"
                touched={formik.touched.description}
                error={formik.errors.description}
                rows="3"
              />
              <FormikControl
                control="input"
                label="Published Date"
                type="date"
                name="publishedDate"
                touched={formik.touched.publishedDate}
                error={formik.errors.publishedDate}
              />

              <button type="submit" disabled={!formik.isValid}>
                Add Book
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default AddBookForm;
