import React from "react";

import "./App.css";
import Hero from "../images/hero.jpg";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
const Links = styled(Link)`
  /* width: 50%; */
  background-color: white;
  padding: 0.2em 1em;
  text-decoration: none;
  color: black;
  font-size: 1rem;
  text-align: center;
  &:hover {
    background-color: whitesmoke;
  }
`;
const Row = styled.div`
  background-color: white;
  padding: 2rem;
  min-height: 99vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;
  align-items: center;
  overflow-y: hidden;
`;
const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;
const Main = styled.div`
  padding-top: 1rem;
  background-image: url(${Hero});
  background-position: center;
  background-repeat: no-repeat;
  background-image: cover;
`;
const HeroSay = styled.div`
  font-size: 2rem;
  color: white;
  position: relative;
  top: 4rem;
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
            <Links to="Mechanic">Cooperate</Links>
          </div>
          <Outlet></Outlet>
        </Row>
        <Title className="col-md-8">
          <HeroSay> </HeroSay>
        </Title>
      </Container>
    </Main>
  );
}

export default Home;
