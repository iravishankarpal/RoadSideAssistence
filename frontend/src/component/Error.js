import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Error() {
  var { message, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  setTimeout(() => dispatch("RESET_ERROR"), 5000);
  return (
    <div>
      <Row>
        <Col>
          {error && (
            <Button disabled variant="danger">
              {" "}
              {message}{" "}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Error;
