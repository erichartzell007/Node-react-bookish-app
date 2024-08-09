import React from "react";
import { Field } from "formik";
import TextError from "./TextError";

const FileInput = ({ label, name, ...rest }) => {
  return (
    <div className="form-control">
      <label className="form-control__label" htmlFor={name}>
        {label}
      </label>
      <Field name={name} {...rest}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <div>
            <input
              type="file"
              className={
                meta.touched && meta.error
                  ? "form-control__field form-control__field__error"
                  : "form-control__field"
              }
              {...field}
            />
            {meta.touched && meta.error ? (
              <TextError error={meta.error} />
            ) : null}
          </div>
        )}
      </Field>
      {/* <Field
        className={
          touched && error
            ? "form-control__field form-control__field__error"
            : "form-control__field"
        }
        id={name}
        name={name}
        {...rest}
      ></Field>
      {touched && error ? <TextError error={error} /> : null} */}
    </div>
  );
};

export default FileInput;
