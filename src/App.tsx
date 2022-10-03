import "./App.css";
import { useGame } from "~/hooks";

function App() {
  const [{ start, stop }] = useGame();
  return <div className="App">hello</div>;
}

export default App;
