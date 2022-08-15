import axios from "axios";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";

// const LinkTo = styled(Link)`
//   text-decoration: none;
//   padding: 0.2rem;
//   color: black;
//   font-size: larger;
// `;

function AllMechanics() {
  const [client, setClient] = useState([]);
  // const { error, loding } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  var fetchList = async () => {
    try {
      // console.log(url);
      dispatch({ type: "REQUEST_START" });
      await axios
        .get("/admin/allMechanic")
        .then((x) => {
          if (x.data === undefined) {
            dispatch({
              type: "USER_LOGIN_FAIL",
              payload: "response is empty ",
            });
          } else {
            setClient(x.data);
            dispatch({ type: "REQUEST_SUCCESS" });
          }
        })
        .catch((err) => {
          console.log("hahaha error in req", err.ressponse);
          dispatch({
            type: "USER_LOGIN_FAIL",
            payload: err || err.ressponse,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button variant="light" onClick={() => fetchList()}>
        {" "}
        LOAD DATA
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#id</th>
            <th>First Name</th>
            <th>EMAIL</th>
            <th>Phone NO</th>
          </tr>
        </thead>
        <tbody>
          {client === undefined ? (
            <>loding </>
          ) : (
            client.map((x) => {
              return (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.PhoneNo}</td>
                  <td>edit</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AllMechanics;
