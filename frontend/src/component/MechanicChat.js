import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import "./Chat.css";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import Loding from "./Loding";
import io from "socket.io-client";
import Error from "./Error";
import axios from "axios";
const socket = io.connect("http://localhost:9000");
const ChatBox = styled.div`
  .chat-body {
    height: 120%;
    background-color: whitesmoke;
  }
  .message-container {
    height: 20rem;
  }
`;
const FormTo = styled(Form)`
  display: flex;
  justify-content: space-between;
  font-size: xx-large;
  width: 100%;
  position: relative;
  padding: 1rem;
  bottom: 2px;
  input {
    border-bottom: 1px solid black;
  }
`;

function MechanicChat({ UserONChat }) {
  const [messageList, setMessageList] = useState([]);
  const message = useRef();
  const { error, loding } = useSelector((state) => state.login);
  // var mech = JSON.parse(localStorage.getItem("RSA"));

  var user = { ...UserONChat };
  console.log(user);
  const sendMessage = async (e) => {
    e.preventDefault();
    axios.post("/message/", {
      content: message.current.value,
      sender: user.sender,
    });
    console.log(
      ` content: message.current.value,
    sender: user.sender, :`,
      message.current.value,
      user.sender
    );
    // console.log(message.current.value);
    if (message.current.value !== "") {
      const messageData = {
        sender: user.sender,
        content: message.current.value,
        id: new Date().getTime(),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      message.current.value = "";
    }
  };

  useEffect(() => {
    socket.emit("join_room", user.sender);
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [user.sender]);

  useEffect(() => {
    if (user.sender !== undefined) {
      // console.log("user.sender :", user.sender);
      axios
        .get("/message/" + user.sender)
        .then((res) => {
          console.log("mech caht", res.data);
          setMessageList(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user.sender]);

  return (
    <ChatBox>
      {error && <Error>{error.message}</Error>}
      {loding && <Loding />}
      <div className="chat-body">
        <h2>{user.name}</h2>
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className={
                  user._id === messageContent.sender ? "roomOwner" : "mechanic"
                }
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  {/* <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div> */}
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      {/* <FormTo onSubmit={(e) => handleChatMessage(e)}>
        <input type="text" ref={message} placeholder=" " />
        <Button type="submit">
          {" "}
          <AiOutlineSend></AiOutlineSend>
        </Button>
      </FormTo> */}
      <FormTo onSubmit={(e) => sendMessage(e)} className="chat-footer">
        <input
          type="text"
          ref={message}
          // value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            message.current.value = event.target.value;
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage(event);
          }}
        />
        <Button type="submit">
          {" "}
          <AiOutlineSend></AiOutlineSend>
        </Button>
      </FormTo>
    </ChatBox>
  );
}

export default MechanicChat;
