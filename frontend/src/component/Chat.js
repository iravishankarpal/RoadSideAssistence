import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlineSend } from "react-icons/ai";
const ChatBox = styled.div`
  height: 100%;
`;
const FormTo = styled(Form)`
  display: flex;
  justify-content: space-between;
  font-size: xx-large;
  width: 90%;
  position: absolute;
  padding: 1rem;
  bottom: 2px;
  input {
    border-bottom: 1px solid black;
  }
`;

function Chat() {
  const message = useRef();
  const handleChatMessage = (e) => {
    e.preventDefault();
    console.log(message.current.value);
    message.current.value = "";
  };
  return (
    <ChatBox>
      <div>messages</div>
      <FormTo onSubmit={(e) => handleChatMessage(e)}>
        <input type="text" ref={message} placeholder=" " />
        <Button type="submit">
          {" "}
          <AiOutlineSend></AiOutlineSend>
        </Button>
      </FormTo>
    </ChatBox>
  );
}

export default Chat;
