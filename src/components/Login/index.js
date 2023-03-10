import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext)

  const handleValidation = (event) => {
    let formIsValid = true;
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const check = handleValidation()
    if (check) {
      const url = process.env.REACT_APP_URL_WEBSITE + '/login'
      const formData = {
        Email: email,
        Password: password,
      }
      axios.post(url, formData)
        .then((data) => {
          const url = process.env.REACT_APP_URL_KEY
          const user = data?.data?.data
          localStorage.setItem(url, JSON.stringify(user));
          if (user?.user?.RoleId === "2") {
            navigate('/admin');
            setUser(user?.user)
            
          }
          if (user?.user?.RoleId === "1") {
            navigate('/');
            setUser(user?.user)
          }
        }).catch((error) => {
          setpasswordError(
            error?.response?.data?.message
          );
        })
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">????ng nh???p</h2>
                  <p className=" mb-5">Nh???p email v?? m???t kh???u!</p>
                  <div className="mb-3">
                    <Form onSubmit={loginSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Nh???p email" onChange={(event) => setEmail(event.target.value)} />
                        <small id="emailHelp" className="text-danger form-text">
                          {emailError}
                        </small>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>M???t kh???u</Form.Label>
                        <Form.Control type="password" placeholder="Nh???p password" onChange={(event) => setPassword(event.target.value)} />
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>

                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          ????ng Nh???p
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        B???n ch??a c?? t??i kho???n?{" "}
                        <Link to='/register' className="text-primary fw-bold">
                          ????ng K??
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Login;
