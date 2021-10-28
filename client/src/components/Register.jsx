import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const Register = ({ setIsLogin }) => {
  const userSchema = Yup.object().shape({
    fullName: Yup.string().min(5, "Mínimo 5 caracteres").required("Requerido"),
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
    passwordConfirmation: Yup.string()
      .required("Requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });

  const [userRegister, setUserRegister] = useState({
    userData: [],
    loaded: false,
  });

  const history = useHistory();

  const createUser = async (values) => {
    const valuesToCreateUser = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    try {
      console.log("values", valuesToCreateUser);
      const response = await axios.post(
        "http://localhost:8001/api/auth/register",
        valuesToCreateUser
      );
      console.log(response);
      setUserRegister({
        ...userRegister,
        userData: [...userRegister.userData, response.data],
      });
      Swal.fire({
        icon: "success",
        title: `"${values.fullName}" se registró exitosamente. Por favor, inicia sesión`,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLogin(true);
          history.push("/login");
        }
      });
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `<ul class="swal-list">${err.response.data.map(
          (error) => `<li>${error}</li>`
        )}</ul>`,
        confirmButtonText: "Lo arreglaré!",
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={userSchema}
        onSubmit={createUser}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="John Wick"
                value={values.fullName}
                onChange={handleChange}
                isValid={touched.fullName && !errors.fullName}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="string"
                name="email"
                placeholder="john_wick@hireme.com"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirm">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                isValid={
                  touched.passwordConfirmation && !errors.passwordConfirmation
                }
                isInvalid={!!errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="my-2">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
