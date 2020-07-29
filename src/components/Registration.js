import React from "react";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";

const Registration = (props) => {
  const authService = props.authService;
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username: document.querySelector("#username").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const mainUser = await authService.Registration(user);
    props.setMainUser(mainUser);
    console.log("user", mainUser);
    history.push("/");
  };

  const regMsg = {
    display: "none",
  };

  const regMsgShow = {
    display: "auto",
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-4 text-center">
          <p className="h2">Registration</p>

          <Form>
            <Form.Label htmlFor="username" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control id="username" placeholder="Username" />
            </InputGroup>

            <Form.Label htmlFor="email" srOnly>
              Email address
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="email" placeholder="Email address" />
            </InputGroup>

            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
              />
            </InputGroup>

            <Button
              variant="primary"
              type="submit"
              className="mb-2 mr-sm-2"
              onClick={handleRegister}
            >
              Registration
            </Button>
          </Form>
          <p id="regmsg" style={regMsg}>
            You are succesfully registered! You can log in now.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
