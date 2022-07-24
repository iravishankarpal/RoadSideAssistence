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
const socket = io.connect("http://localhost:9000");
const ChatBox = styled.div`
  .chat-body {
    height: 90%;
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

function Chat() {
  // console.log(UserONChat :", UserONChat);

  // const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const message = useRef();
  const { error, loding, user } = useSelector((state) => state.login);

  console.log(user);
  const sendMessage = async (e) => {
    e.preventDefault();
    // console.log(message.current.value);
    if (message.current.value !== "") {
      const messageData = {
        room: user._id,
        author: user.name,
        message: message.current.value,
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
    socket.emit("join_room", user._id);
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [user._id]);

  return (
    <ChatBox>
      {error && <Error>{error.message}</Error>}
      {loding && <Loding />}
      <div className="chat-body">
        <>{user.name}</>
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            // console.log(messageContent);

            return (
              <div
                key={messageContent.id}
                className="message"
                id={user.name === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
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
        />
        <Button type="submit">
          {" "}
          <AiOutlineSend></AiOutlineSend>
        </Button>
      </FormTo>
    </ChatBox>
  );
}

export default Chat;
