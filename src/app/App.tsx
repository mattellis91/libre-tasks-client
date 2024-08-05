import { Header, Board, EmptyBoard } from "../components";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "./store";

function App() {
  const boards = useSelector((state:RootState) => state.boards.boards);
  const theme = useSelector((state:RootState) => state.theme);

  return (
    <div className="app" data-theme={theme.theme}>
      <Header />
      {boards.length > 0 ? <Board /> : <EmptyBoard />}
    </div>
  );
}

export default App;
