import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import FormikControl from "../../components/shared/Formik/FormikControl";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { editBook } from "./BookSlice";
import "./EditBookModal.css";

const EditBookModal = ({
  isOpenModal,
  setisOpenModal,
  selectedBookForEdit,
}) => {
  const handleModalClose = () => {
    setisOpenModal(false);
  };

  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const initialValues = {
    _id: selectedBookForEdit._id,
    title: selectedBookForEdit.title,
    description: selectedBookForEdit.description,
    publishedDate: selectedBookForEdit.publishedDate,
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
    try {
      const response = await dispatch(editBook(values)).unwrap();
      if (response) {
        setisOpenModal(false);
      }
    } catch (error) {
      // handle error here
      console.log("Error while Submitting", error);
    }
  };

  return (
    <>
      {isOpenModal ? (
        <div className="modal">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="editbook-form" encType="multipart/form-data">
                  <button
                    type="button"
                    className="modal__action--negative"
                    onClick={handleModalClose}
                  >
                    X
                  </button>
                  <h2 className="editbook-title">Edit Book</h2>
                  <FormikControl
                    control="input"
                    label="Title"
                    type="text"
                    name="title"
                    touched={formik.touched.title}
                    error={formik.errors.title}
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
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : null}
    </>
  );
};

export default EditBookModal;
