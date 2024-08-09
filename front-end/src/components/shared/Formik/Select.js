import React from "react";
import { Field } from "formik";
import TextError from "./TextError";

const Select = ({ label, name, touched, error, options, ...rest }) => {
  return (
    <div className="form-control">
      <label className="form-control__label" htmlFor={name}>
        {label}
      </label>
      <Field
        as="select"
        className={
          touched && error
            ? "form-control__field form-control__field__error"
            : "form-control__field"
        }
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      {touched && error ? <TextError error={error} /> : null}
    </div>
  );
};

export default Select;
