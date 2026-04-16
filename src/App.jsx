import { useState } from "react";
import Home from "./Home";
import Game from "./Game";
import Countdown from "./Countdown";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "home") {
    return <Home startGame={() => setScreen("countdown")} />;
  }

  if (screen === "countdown") {
    return <Countdown onFinish={() => setScreen("game")} />;
  }

  if (screen === "game") {
    return <Game goHome={() => setScreen("home")} />;
  }

  return null; // fallback
}