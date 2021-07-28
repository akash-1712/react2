import React, { useState, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const reducerEmail = (state, action) => {
  if (action.type === "USER_LOGIN") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_LOGIN") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: null,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: EmailIsValid } = emailState;
  const { isValid: PasswordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(EmailIsValid && PasswordIsValid);
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [EmailIsValid, PasswordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_LOGIN", val: event.target.value });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordDispatch({ type: "USER_LOGIN", val: event.target.value });

    setFormIsValid(passwordState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({ type: "PASS_BLUR" });
  };
  const emailReference = useRef();
  const passwordReference = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
      return;
    } else if (!EmailIsValid) {
      emailReference.current.focu();
    } else {
      passwordReference.current.focu();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailReference}
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label="E-Mail "
          isValid={emailState.isValid}
        ></Input>

        <Input
          ref={passwordReference}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
          isValid={passwordState.isValid}
        ></Input>

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn} /*disabled={!formIsValid}*/
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
