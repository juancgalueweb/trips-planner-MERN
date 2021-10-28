import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";

export const TripForm = ({ processSubmit, initialValues, titleButton }) => {
  const formSchema = Yup.object().shape({
    location: Yup.string()
      .min(3, "Longitud mínima de 3 caracteres")
      .required("La ubicación es requerida"),
    date: Yup.date().required("El viaje necesita una fecha de inicio"),
    people: Yup.string(),
    status: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={processSubmit}
    >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Mars"
              value={values.location}
              onChange={handleChange}
              isValid={touched.location && !errors.location}
              isInvalid={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              isValid={touched.date && !errors.date}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="people">
            <Form.Label>Personas</Form.Label>
            <Form.Control
              type="text"
              name="people"
              value={values.people} //.split(",")
              onChange={handleChange}
              isValid={touched.people && !errors.people}
              isInvalid={!!errors.people}
            />
            <Form.Text className="text-muted">
              Separar las personas por coma {","}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.people}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Estado del viaje</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={values.status}
              onChange={handleChange}
              isValid={touched.status && !errors.status}
              isInvalid={!!errors.status}
            />
            <Form.Control.Feedback type="invalid">
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-2">
            {titleButton}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
