import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MechReg from "./MechReg";

const LinkTo = styled(Link)`
  text-decoration: none;
  padding: 0.2rem;
  color: black;
  font-size: larger;
`;
function Admin() {
  return (
    <>
      <div className="row">
        <LinkTo to="Clients">
          <Button variant="dark" disabled>
            All Client
          </Button>
        </LinkTo>
        <LinkTo to="Mechanics">
          <Button variant="success" disabled>
            ALL mechanic
          </Button>
        </LinkTo>
        <LinkTo to="userProblem">
          <Button variant="warning" disabled>
            All Query
          </Button>
        </LinkTo>
        <LinkTo to="regMech">
          <Button variant="light" disabled>
            Register Mechanic
          </Button>
        </LinkTo>
        <MechReg />
      </div>
    </>
  );
}

export default Admin;
