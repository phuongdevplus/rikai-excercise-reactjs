import axios from "axios";
import React, { useState, useContext } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";

function Register() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setnameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext)

  const handleValidation = (event) => {
    let formIsValid = true;
    if (name?.length === 0) {
      setnameError('Name Not Valid ')
      return false;
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z0-9]{8,22}$/) || !passwordConfirm.match(/^[a-zA-Z0-9]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    if (passwordConfirm !== password) {
      formIsValid = false;
      setpasswordError(
        "Password does not match"
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
    handleValidation();
    const check = handleValidation()
    Swal.fire({
      title: "Tạo tài khoản?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (check) {
          const url = process.env.REACT_APP_URL_WEBSITE + '/register'
          const formData = {
            Name: name,
            Email: email,
            Password: password,
          }
          axios.post(url, formData)
            .then((data) => {
              Swal.fire({
                title: 'Create account successfully',
                timer: 2000,
              })
              const url = process.env.REACT_APP_URL_KEY
              const user = data?.data?.data
              localStorage.setItem(url, JSON.stringify(user));
              if (user?.user?.RoleId === 2) {
                setUser(user?.user)
                navigate('/admin');
              }
              if (user?.user?.RoleId === 1) {
                setUser(user?.user)
                navigate('/');
              }
            }).catch((error) => {
              Swal.fire({
                title: error?.response?.data?.message,
                timer: 2000,
              })
              setemailError(
                error?.response?.data?.message
              );
            })
        }
      } else {
        Swal.fire(" Hủy!", "", "error");
      }
    });
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
                  <h2 className="fw-bold mb-2 text-uppercase ">Register</h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={loginSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={(event) => setName(event.target.value)} />
                        <small id="name" className="text-danger form-text">
                          {nameError}
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                        <small id="emailHelp" className="text-danger form-text">
                          {emailError}
                        </small>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>

                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword1"
                      >
                        <Form.Label>Confirm password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event) => setPasswordConfirm(event.target.value)} />
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>

                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Do you already have an account?{" "}
                        <Link to='/login' className="text-primary fw-bold">
                          Sign In
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
export default Register;
