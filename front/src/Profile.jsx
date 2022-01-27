import React, { useEffect } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image, Button, Input } from "antd";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 15px;
`;

const ProfileImage = styled(Image)`
  width: 150px;
  height: 150px;

  border-radius: 100%;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 11.5px;
  color: #999;
  margin-bottom: 5px;
  margin-top: 40px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  margin-top: 5px;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loginFlag = loginCheck();

    if (!loginFlag) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <TopNav title="Profile" desc="회원정보를 확인할 수 있습니다." />
      <Wrapper>
        <ProfileImage src="https://cdn4.vectorstock.com/i/1000x1000/43/48/four-leaf-clover-logo-vector-15904348.jpg" />
        <Button type="primary" size="small">
          이미지 변경
        </Button>

        <Text>상태 메세지</Text>
        <Input allowClear={true} />
        <BtnWrapper>
          <Button type="primary" size="small">
            저장
          </Button>
        </BtnWrapper>
      </Wrapper>
    </div>
  );
};

export default Profile;
