import React from "react";
import { Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
const LodingBtn = styled(Button)`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
`;
function Loding() {
  return (
    <div>
      <LodingBtn className="container " variant="light" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="lg"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </LodingBtn>
    </div>
  );
}

export default Loding;
