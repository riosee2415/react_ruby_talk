import React from "react";
import styled from "styled-components";
import BottomNav from "./BottomNav";
import { Routes, Route } from "react-router-dom";
import Friend from "./Friend";
import Message from "./Message";
import Profile from "./Profile";
import Setting from "./Setting";

const ContentWrapper = styled.section`
  width: 100%;
  height: calc(100vh - 60px);

  overflow: scroll;
`;

const NavWrapper = styled.section`
  width: 100%;
  height: 60px;
`;

class App extends React.Component {
  render() {
    return (
      <>
        <ContentWrapper>
          <Routes>
            <Route exact path="/friend" element={<Friend />} />
            <Route exact path="/message" element={<Message />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/setting" element={<Setting />} />
          </Routes>
        </ContentWrapper>

        <NavWrapper>
          <BottomNav />
        </NavWrapper>
      </>
    );
  }
}

export default App;
