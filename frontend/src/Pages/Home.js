// import axios from "axios";
import React from "react";
// import { Tab, Tabs } from "react-bootstrap";
// import Login from "../component/Login";
// import SingUp from "../component/SingUp";
import "./App.css";
// import styled form "styled-com"
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
const Links = styled(Link)`
  width: 50%;
  background-color: white;
  padding: 0.2em 1em;
  text-decoration: none;
  color: black;
  font-size: 2rem;
  text-align: center;
  &:hover {
    background-color: whitesmoke;
  }
`;
const Row = styled.div`
  background-color: white;
  padding: 2rem;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;
const Main = styled.div`
  padding-top: 1rem;
  background-image: url("https://www.volkswagen.co.uk/content/dam/onehub_pkw/importers/gb/owners/roadside-assistance/owners_drivers-roadside_assistance-hero_v2-16_9-1920x1080.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-image: cover;
`;
const HeroSay = styled.div`
  font-size: 2rem;
  color: white;
  position: relative;
  top: 4rem;
  /* background-color: white; */
`;
function Home() {
  return (
    <Main>
      <Container className="container row ">
        <Row className="col-md-4 order-xl-last">
          <Title> Quick Assistence</Title>
          <div className="d-flex mb-3 ">
            <Links to="login"> Login </Links>
            <Links to="singup"> SingUp </Links>
          </div>
          <Outlet></Outlet>
        </Row>
        <Title className="col-md-8">
          <HeroSay>A Quick Solution To All your rode side need </HeroSay>
        </Title>
      </Container>
    </Main>
  );
}

export default Home;
