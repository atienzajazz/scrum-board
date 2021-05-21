import React from "react";
import styled from "styled-components";
import FormModalContext from "../context/FormModalContext";
import DragNDropBoard from "../DragNDropBoard";
import Header from "./Header";
import Footer from "./Footer";

const HeroPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 10px;
  overflow: auto;
`;

const Content = styled.main`
  display: flex;
  justify-content: center;
`;

const ScrumBoard = () => (
  <HeroPage>
    <FormModalContext>
      <Header />
      <Content>
        <DragNDropBoard />
      </Content>
      <Footer />
    </FormModalContext>
  </HeroPage>
);

export default ScrumBoard;
