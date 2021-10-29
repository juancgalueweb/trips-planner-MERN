import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export const MainScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const getTripByUser = async () => {
    try {
      const tripsData = await axios.get(
        `http://localhost:8001/api/trips/${user._id}`
      );

      setTrips(tripsData.data);
      setLoaded(true);
      // console.log("Trips del axios.get", trips);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  const deleteTrip = async (tripId, tripLocation) => {
    try {
      await Swal.fire({
        title: `¿Seguro que quiere borrar el viaje a <strong>${tripLocation}</strong>?`,
        showDenyButton: true,
        denyButtonText: "Me arrepentí",
        confirmButtonText: "Borrar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Borrado!", "", "success");
          axios.delete(`http://localhost:8001/api/trip/delete/${tripId}`);
          setTrips(trips.filter((trip) => trip._id !== tripId));
        } else if (result.isDenied) {
          Swal.fire("No se borrará", "", "info");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Usuario del useContext: ", user);
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  useEffect(() => {
    getTripByUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Container className="my-3 mx-auto bg-light shadow rounded w-75">
        <Row>
          <Col>
            <p className="text-end">Hola, {user?.fullName}</p>
            <Button variant="dark" className="float-end" onClick={handleLogOut}>
              Cerrar sesión
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">Mis viajes</h2>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Lugar del viaje</th>
                  <th>Fecha</th>
                  <th>Grupo de viaje</th>
                  <th>Estado del viaje</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loaded && trips.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-uppercase fs-4">
                      No hay viajes planificados
                    </td>
                  </tr>
                ) : (
                  trips.map((trip) => (
                    <tr key={trip._id}>
                      <td>{trip.location}</td>
                      <td>{moment.utc(trip.date).format("DD-MM-YYYY")}</td>
                      <td>
                        {trip.people.length > 1
                          ? trip.people.join(", ")
                          : trip.people}
                      </td>
                      <td>{trip.status}</td>
                      <td className="text-center">
                        <Link to={`/trip/${trip._id}`}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="lg"
                            className="text-success mx-2"
                          />
                        </Link>
                        <FontAwesomeIcon
                          className="text-danger mx-2 delete-pointer"
                          icon={faTrashAlt}
                          size="lg"
                          onClick={() => {
                            deleteTrip(trip._id, trip.location);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <Button variant="primary" className="my-2 float-end">
              <Link to={"/new"} className="text-decoration-none text-light">
                Crear nuevo viaje
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
