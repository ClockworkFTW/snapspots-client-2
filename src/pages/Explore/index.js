import React, { useState } from "react";
import styled from "styled-components";

import { Spots } from "./Spots";
import { Map } from "./Map";

const Explore = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Container sidebarOpen={sidebarOpen}>
      {sidebarOpen && (
        <Sidebar>
          <Spots />
        </Sidebar>
      )}
      <Main>
        <SidebarButton onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "close" : "open"}
        </SidebarButton>
        <Map />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ sidebarOpen }) =>
    sidebarOpen ? "800px 1fr" : "1fr"};
  height: calc(100vh - 65px);
`;

const Sidebar = styled.div`
  overflow-y: scroll;
  background: #f2f2f2;
`;

const SidebarButton = styled.button`
  z-index: 10;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  font-family: inherit;
  font-size: 16px;
`;

const Main = styled.div`
  position: relative;
`;

export default Explore;
