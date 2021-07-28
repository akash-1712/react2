import React, { useImperativeHandle, useRef } from "react";
import classes from "../../Login/Login.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activation = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focu: activation,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange || null}
        onBlur={props.onBlur || null}
      />
    </div>
  );
});

export default Input;
