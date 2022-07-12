import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { BsChatLeftTextFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
const HelpBtn = styled.span`
  padding: 1rem;
  background-color: white;
  color: black;
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  font-size: xx-large;
  border-radius: 50%;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  padding: 0.2rem;
  color: black;
  font-size: larger;
`;
const PopUpBox = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 3rem;
  background-color: white;
  color: black;
  /* max-width: 30vw; */
  min-width: 30vw;
  min-height: 70vh;
  padding: 1rem;
  z-index: 10000;

  @media (max-width: 786px) {
    max-width: 90%;
    min-width: 80vw;
  }
`;

function Help() {
  const [show, setshow] = useState(false);

  return (
    <div>
      {show && (
        <PopUpBox>
          <LinkTo to="Problem">
            <Button variant="warning" disabled>
              {" "}
              Get Mechanic
            </Button>
          </LinkTo>
          <LinkTo to="Chat">
            <Button variant="success" disabled>
              Chat
            </Button>
          </LinkTo>
          <br className="mb-1 " />
          <Outlet> </Outlet>
        </PopUpBox>
      )}
      <HelpBtn
        onClick={() => {
          setshow(!show);
          //   console.log(show);
        }}
      >
        <BsChatLeftTextFill></BsChatLeftTextFill>
      </HelpBtn>
    </div>
  );
}

export default Help;
