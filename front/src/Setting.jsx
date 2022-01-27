import React, { useEffect } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CaretRightOutlined, InfoCircleOutlined } from "@ant-design/icons";

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
  justify-content: flex-start;

  padding: 0px 10px;
`;

const Text = styled.span`
  margin-left: 5px;
`;

const Setting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loginFlag = loginCheck();

    if (!loginFlag) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <TopNav title="Setting" desc="환경설정을 할 수 있습니다." />

      <Box>
        <InnerBox width="85%">
          <InfoCircleOutlined />
          <Text>개인정보 처리 방침</Text>
        </InnerBox>
        <InnerBox width="15%">
          <CaretRightOutlined />
        </InnerBox>
      </Box>

      <Box>
        <InnerBox width="85%">
          <InfoCircleOutlined />
          <Text>소프트웨어 정보</Text>
        </InnerBox>
        <InnerBox width="15%">
          <CaretRightOutlined />
        </InnerBox>
      </Box>

      <Box>
        <InnerBox width="85%">
          <InfoCircleOutlined />
          <Text>개발사</Text>
        </InnerBox>
        <InnerBox width="15%">
          <CaretRightOutlined />
        </InnerBox>
      </Box>

      <Box>
        <InnerBox width="85%">
          <InfoCircleOutlined />
          <Text>알람 설정</Text>
        </InnerBox>
        <InnerBox width="15%">
          <CaretRightOutlined />
        </InnerBox>
      </Box>

      <Box>
        <InnerBox width="85%">
          <InfoCircleOutlined />
          <Text>테마 설정</Text>
        </InnerBox>
        <InnerBox width="15%">
          <CaretRightOutlined />
        </InnerBox>
      </Box>
    </div>
  );
};

export default Setting;
