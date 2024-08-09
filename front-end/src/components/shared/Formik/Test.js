import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";

function Test() {
  return (
    <div>
      <h1>Upload a PDF</h1>
      <Formik
        initialValues={{ pdf: null }}
        onSubmit={async (values) => {
          const formData = new FormData();
          formData.append("pdf", values.pdf);
          try {
            const res = await axios.post(
              "http://localhost:5000/api/upload",
              formData
            );
            console.log(res.data.filename);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div>
              <Field
                name="pdf"
                type="file"
                accept=".pdf"
                value={undefined}
                onChange={(event) => {
                  setFieldValue("pdf", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="pdf" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Test;
