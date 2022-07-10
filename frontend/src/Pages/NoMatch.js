import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const NoMatchPage = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
`;
function NoMatch() {
  return (
    <NoMatchPage>
      {" "}
      404 <br /> page not found <br />
      <span>
        <Link to="/MainMap"> Go to Home </Link>{" "}
      </span>
    </NoMatchPage>
  );
}

export default NoMatch;
