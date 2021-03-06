import React, { useState } from "react";
import styled from "styled-components";
import { Image, Modal, Input } from "antd";

const Box = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #dfdfdf;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  width: 35px;
  height: 35px;

  border-radius: 100%;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-weight: 700;
`;

const SendTextArea = styled(Input.TextArea)`
  width: 100%;

  resize: none;
`;

const FriendBox = ({ key, name, avatar, status }) => {
  const [sendModal, setSendModal] = useState(false);

  //
  const sendOpen = (pk) => {
    setSendModal(true);
  };

  const sendClose = () => {
    setSendModal(false);
  };

  return (
    <Box>
      <InnerBox width="30%">
        <ProfileImage src={avatar} />
        <ProfileName onClick={() => sendOpen(4)}>{name}</ProfileName>
      </InnerBox>
      <InnerBox width="70%">
        <span>{status}</span>
      </InnerBox>

      <Modal
        title="매세지 보내기"
        visible={sendModal}
        onCancel={() => sendClose()}
      >
        <SendTextArea allowClear={true} rows={10} />
      </Modal>
    </Box>
  );
};

export default FriendBox;
