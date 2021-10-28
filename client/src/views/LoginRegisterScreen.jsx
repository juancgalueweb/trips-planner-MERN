import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { UserContext } from "../contexts/UserContext";

export const LoginRegisterScreen = () => {
  const [isLogin, setIsLogin] = useState();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleOnClick = () => {
    if (isLogin) {
      setIsLogin(false);
      history.push("/register");
    } else {
      setIsLogin(true);
      history.push("/login");
    }
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
    location.pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Container className="m-2">
        <Row className="d-flex justify-content-center align-items-center">
          <Col className="col-5 bg-light shadow rounded">
            {isLogin ? (
              <h2 className="text-center">Login</h2>
            ) : (
              <h2 className="text-center">Register</h2>
            )}
            {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
            <Button variant="warning" onClick={handleOnClick} className="mb-3">
              Ir al {isLogin ? "registro" : "login"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
