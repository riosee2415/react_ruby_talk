import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Whole = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppTitle = styled.h2`
  margin-bottom: 100px;
`;

const LoginBox = styled.div`
  width: 80%;
  height: 90px;
  border-radius: 9.5px;

  box-shadow: 4px 4px 9px #adadad;
  margin-bottom: 100px;

  padding: 10px;
`;

const InputGuide = styled.span`
  font-size: 13px;
  color: #999;
`;

const InputEmail = styled.input`
  width: 100%;
  height: 25px;

  margin: 10px 0px;

  border: 1px solid #adadad;
  border-radius: 3px;
  outline: none;
  background: none;
  padding: 0px 5px;

  box-shadow: 2px 2px 7px #adadad;
`;

const SignButton = styled(Button)`
  width: 80%;
  margin-bottom: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const flag = localStorage.getItem("ruby_login");

    if (flag === "true") {
      navigate("/friend");
    } else {
      return;
    }
  }, []);

  const onChangeInput = (event) => {
    setEmail(event.target.value);
  };

  const onChangeCode = (event) => {
    setCode(event.target.value);
  };

  const loginAction = async () => {
    if (email === "") {
      return message.error("이메일을 입력해주세요.");
    }

    const result = await axios.post(
      "http://localhost:4000/api/user/emailCheck",
      {
        email,
      }
    );

    setStep(2);
  };

  const codeCheckAction = async () => {
    const result = await axios.post(
      "http://localhost:4000/api/user/checkCode",
      {
        email,
        code,
      }
    );

    await localStorage.setItem("ruby_login", true);
    await localStorage.setItem("ruby_user_nickname", result.data.nickname);
    await localStorage.setItem("ruby_user_avatar", result.data.avatar);
    await localStorage.setItem("ruby_user_id", result.data.id);
    await localStorage.setItem("ruby_user_statusMsg", result.data.statusMsg);
    await localStorage.setItem("ruby_user_email", result.data.email);

    message.success(
      `${result.data.nickname}님, 환영합니다. Ruby Talk에 접속하셨습니다.`
    );

    navigate("/friend");
  };

  return (
    <Whole>
      <AppTitle>RUBY TALK</AppTitle>
      <LoginBox>
        <InputGuide>
          {step === 1 ? "이메일을 입력해주세요." : "인증번호를 입력해주세요."}
        </InputGuide>

        {step === 1 ? (
          <InputEmail
            placeholder="ruby@talk.com"
            value={email}
            onChange={onChangeInput}
          />
        ) : (
          <InputEmail value={code} onChange={onChangeCode} />
        )}
      </LoginBox>

      <SignButton
        type="primary"
        onClick={step === 1 ? () => loginAction() : () => codeCheckAction()}
      >
        {step === 1 ? "SIGN IN" : "CHECK"}
      </SignButton>

      <SignButton type="default">SIGN UP</SignButton>
    </Whole>
  );
};

export default Login;
