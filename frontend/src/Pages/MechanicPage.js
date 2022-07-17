import axios from "axios";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Error from "../component/Error";
import Loding from "../component/Loding";
function MechanicPage() {
  const [client, setClient] = useState([]);
  const { error, loding } = useSelector((state) => state.login);

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
  const DeleteQuery = async (id) => {
    await axios
      .delete(`/admin/DeleteQuery${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "QUERY_DELETE", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "USER_LOGIN_FAIL",
          payload: err.message || "error delete file",
        });
      })
      .finally(() => {
        fetchClients();
      });
  };
  return (
    <div>
      <div>
        <Button variant="light" onClick={() => fetchClients()}>
          {" "}
          LOAD DATA
        </Button>
        <span>
          {error && <Error>{error.message}</Error>}
          {loding && <Loding />}
        </span>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>name</th>
              <th>PhoneNO</th>
              <th>VehicalNo</th>
              <th>VehicalType</th>
              <th>VehicalProblem</th>
              <th>location</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {client === undefined ? (
              <>loding </>
            ) : (
              client.map((x) => {
                return (
                  <tr key={x._id}>
                    <td>{x.name}</td>
                    <td>{x.PhoneNo}</td>

                    <td>{x.VehicalNo}</td>
                    <td>{x.VehicalType}</td>
                    <td>{x.VehicalProblem}</td>
                    <td>{x.Location}</td>
                    <td>{x.lat}</td>
                    <td>{x.lng}</td>
                    <td>{x.status}</td>
                    <td
                      onClick={() => {
                        // TogleChatbox(x.sender)
                        // CharacterData()
                      }}
                    >
                      Chat
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      // onClick={() => fetchClients()}
                      onClick={() => {
                        DeleteQuery(x._id);
                      }}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MechanicPage;
