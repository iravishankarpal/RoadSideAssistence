import React from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
// import Error from "../component/Error";
// import Loding from "../component/Loding";
import MechReg from "../component/MechReg";
// import MechReg from "./MechReg";
const LinkTo = styled(Link)`
  text-decoration: none;
  padding: 0.2rem;
  color: black;
  font-size: larger;
`;
const AdminLink = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  > Button {
    margin-inline: 0.3rem;
  }
  /* background-color: red; */
`;
function Admin() {
  return (
    <>
      <AdminLink>
        <LinkTo to="Clients">
          <Button variant="dark">All User</Button>
        </LinkTo>

        <LinkTo to="Mechanics">
          <Button variant="success">ALL mechanic</Button>
        </LinkTo>
        <LinkTo to="Querys">
          <Button variant="warning">All Query</Button>
        </LinkTo>
      </AdminLink>
      <div className="row">
        <div className="col-md-3">
          <MechReg></MechReg>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
