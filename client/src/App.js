import "./App.css";
import { Link } from "react-router-dom";
import rash from "./video/rash.mp4";

function App() {
  return (
    <div className="App">
      <img
        class="joystick"
        src="http://thumbs.gfycat.com/CheerfulAntiqueDassie-max-1mb.gif"
      />
      <Link to="/home">Home</Link>
      <div className="vid">
        <video class="face" loop autoPlay muted>
          <source src={rash} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
