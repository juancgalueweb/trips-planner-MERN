import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const UserForm = (props) => {
  const { isLogin, handleUserSubmit, titleSubmitButton } = props;

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

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato de email inválido")
      .required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  });

  return (
    <>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={isLogin ? loginSchema : userSchema}
        onSubmit={handleUserSubmit}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {!isLogin ? (
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
            ) : null}
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
            {!isLogin ? (
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
            ) : null}

            <Button variant="primary" type="submit" className="my-2">
              {titleSubmitButton}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
