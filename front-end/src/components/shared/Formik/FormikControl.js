import React from "react";
import Input from "./Input";
import "./controls.css";
import Select from "./Select";
import FileInput from "./FileInput";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "fileinput":
      return <FileInput {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
