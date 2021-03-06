import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import { loginCheck } from "./middlewares";
import { useNavigate } from "react-router-dom";
import FriendBox from "./components/FriendBox";
import axios from "axios";

const Friend = () => {
  const [fList, setFList] = useState([]);

  const navigate = useNavigate();

  const friendList = async (me) => {
    const list = await axios.post(
      "http://localhost:4000/api/user/friend/list",
      { me }
    );

    setFList(list.data);
  };

  useEffect(() => {
    const loginFlag = loginCheck();

    if (!loginFlag) {
      navigate("/");
    }

    const me = localStorage.getItem("ruby_user_id");

    friendList(me);
  }, []);

  return (
    <div>
      <TopNav title="Friend" desc="친구목록을 확인할 수 있습니다." />

      {fList.map((f) => (
        <FriendBox
          key={f.id}
          name={f.nickname}
          avatar={f.avatar}
          status={f.statusMsg}
        />
      ))}
    </div>
  );
};

export default Friend;
