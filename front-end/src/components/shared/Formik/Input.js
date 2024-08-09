import React from "react";
import { Field } from "formik";
import TextError from "./TextError";

const Input = ({ label, name, touched, error, ...rest }) => {
  return (
    <div className="form-control">
      <label className="form-control__label" htmlFor={name}>
        {label}
      </label>
      <Field
        className={
          touched && error
            ? "form-control__field form-control__field__error"
            : "form-control__field"
        }
        id={name}
        name={name}
        {...rest}
      ></Field>
      {touched && error ? <TextError error={error} /> : null}
    </div>
  );
};

export default Input;
