import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [buttonColor, setColor] = useState("red");
  const newColor = buttonColor === "red" ? "blue" : "red";
  return (
    <div role="wrapper">
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setColor(newColor)}
      >
        change to {newColor}!
      </button>
      <a href=""></a>
    </div>
  );
}

export default App;
