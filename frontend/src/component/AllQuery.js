import axios from "axios";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useDispatch } from "react-redux";

function AllQuery() {
  const [client, setClient] = useState([]);
  const dispatch = useDispatch();
  var fetchClients = async () => {
    dispatch({ type: "REQUEST_START" });
    await axios
      .get("/admin/allQuery")
      .then((x) => {
        console.log(x.data);
        setClient(x.data);
        dispatch({ type: "REQUEST_SUCCESS" });
      })
      .catch((err) => {
        console.log("hahaha error in req", err.ressponse);
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: err || err.ressponse,
        });
      });
  };

  return (
    <div>
      <Button variant="light" onClick={() => fetchClients()}>
        {" "}
        LOAD DATA
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#id</th>
            <th>user</th>
            <th>VehicalNo</th>
            <th>VehicalType</th>
            <th>VehicalProblem</th>
            <th>location</th>
            <th>latitude</th>
            <th>longitude</th>
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
                  <td>{x.user}</td>
                  <td>{x.VehicalNo}</td>
                  <td>{x.VehicalType}</td>
                  <td>{x.VehicalProblem}</td>
                  <td>{x.Location}</td>
                  <td>{x.lat}</td>
                  <td>{x.lng}</td>
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

export default AllQuery;
// "_id": "62d009e65c52013b46ddca0c",
//     "VehicalNo": "asdfasf",
//     "VehicalType": "asdfasdf@asdf",
//     "VehicalProblem": "asfdasf",
//     "Location": "asdf",
//     "lat": 19.1995395,
//     "lng": 73.1776845,
//     "__v": 0
