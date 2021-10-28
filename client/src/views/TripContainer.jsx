import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { UserContext } from "../contexts/UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useHistory, Link } from "react-router-dom";
import { TripForm } from "../components/TripForm";
import Button from "react-bootstrap/Button";
import moment from "moment";

export const TripContainer = () => {
  const { user, setUser } = useContext(UserContext);

  const startingData = {
    location: "",
    date: "",
    people: "",
    status: "",
  };
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [initialData, setInitialData] = useState(startingData);
  const history = useHistory();

  const getTripById = async () => {
    try {
      const trip = await axios.get(`http://localhost:8001/api/trip/${id}`);
      console.log("Trip data from Axios", trip.data);
      setInitialData({
        ...trip.data,
        people: trip.data.people.join(", "),
        date: moment(trip.data.date).add(1, "days").format("YYYY-MM-DD"),
      });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const createTrip = async (values, { resetForm }) => {
    console.log("Values de createTrip", values);
    try {
      await axios.post("http://localhost:8001/api/trip/create", {
        ...values,
        author: user._id,
      });
      Swal.fire({
        icon: "success",
        title: "Viaje creado con éxito",
        showConfirmButton: false,
        timer: 2000,
      });
      resetForm();
      setTimeout(() => {
        history.push("/");
      }, 2100);
    } catch (err) {
      console.log(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const updateTrip = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8001/api/trip/${id}`,
        values
      );
      console.log("Response", response);
      Swal.fire({
        icon: "success",
        title: "El viaje fue modificado",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        history.push("/");
      }, 2100);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTripById();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      setLoaded(false);
      console.log(id);
      if (id !== undefined) {
        const res = await axios.get(`http://localhost:8001/api/trip/${id}`);
        setInitialData({ ...res.data });
      } else {
        await setInitialData(startingData);
      }
      setLoaded(true);
    }
    fetchData();
  }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Container className="m-3 w-50 mx-auto">
      <Row>
        <Col>
          <Button variant="dark" className="float-start">
            <Link to="/" className="text-decoration-none text-light">
              Volver al dashboard
            </Link>
          </Button>
          <p className="text-end">Hola, {user?.fullName}</p>
          <Button variant="dark" className="float-end" onClick={handleLogOut}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Mi aplicación de viajes</h1>
          {loaded ? (
            <TripForm
              processSubmit={id !== undefined ? updateTrip : createTrip}
              initialValues={initialData}
              titleButton={id !== undefined ? "Actualizar" : "Crear"}
            />
          ) : (
            <h1>Cargando...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};
