import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
function Login() {
  const navigate = useNavigate();
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  // const [, set] = useState(second)

  useEffect(() => {
    const userExist = false;
    if (userExist) {
      navigate("/Chat");
    }
  }, [navigate]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <br />
      <Button variant="danger" type="submit">
        Login with Google
      </Button>
    </div>
  );
}

export default Login;
