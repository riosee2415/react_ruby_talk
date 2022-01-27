import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Fade from "react-reveal/Fade";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;

  border-bottom: 1px solid #d2d2d2;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSend ? "flex-end" : "flex-start")};
  justify-content: flex-start;

  padding: 5px;
`;

const TopMsg = styled.div`
  font-weight: 700;
  color: ${(props) => (props.isSend ? "#a29bfe" : "#6c5ce7")};
  margin-bottom: 5px;
`;

const Content = styled.p`
  font-size: 12px;
  color: #666;
  padding: 5px;
`;

const MsgBox = ({ isSend }) => {
  const [contentModal, setContentModal] = useState(false);

  const modalToggle = () => {
    setContentModal(!contentModal);
  };

  if (isSend) {
    return (
      <Fade right>
        <Wrapper isSend={isSend} onClick={() => modalToggle()}>
          <TopMsg isSend={isSend}>보낸 메세지</TopMsg>
          <Content>내용 내용 내용....</Content>

          <Modal
            title="쪽지함 내용"
            visible={contentModal}
            footer={null}
            onCancel={() => modalToggle()}
          >
            <p>블라블라블라.....</p>
          </Modal>
        </Wrapper>
      </Fade>
    );
  } else {
    return (
      <Fade left>
        <Wrapper isSend={isSend} onClick={() => modalToggle()}>
          <TopMsg isSend={isSend}>받은 메세지</TopMsg>
          <Content>내용 내용 내용....</Content>

          <Modal
            title="쪽지함 내용"
            visible={contentModal}
            footer={null}
            onCancel={() => modalToggle()}
          >
            <p>블라블라블라.....</p>
          </Modal>
        </Wrapper>
      </Fade>
    );
  }
};

export default MsgBox;
