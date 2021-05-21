import React from "react";
import ScrumBoard from "./components/ScrumBoard";
import BoardContext from "./components/context/BoardContext";

function App() {
  return (
    <BoardContext>
      <ScrumBoard />
    </BoardContext>
  );
}

export default App;
