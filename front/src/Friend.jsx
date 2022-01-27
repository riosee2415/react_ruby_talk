import React, { useEffect } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import FriendBox from "./components/FriendBox";

const Friend = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loginFlag = loginCheck();

    if (!loginFlag) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <TopNav title="Friend" desc="친구목록을 확인할 수 있습니다." />

      <FriendBox />
      <FriendBox />
      <FriendBox />
    </div>
  );
};

export default Friend;
