import "./App.css";
import { Link } from "react-router-dom";
import rash from "./video/rash.mp4";

function App() {
  return (
    <div className="App">
      <div class="video-container">
        <video class="face" loop autoPlay muted>
          <source src={rash} type="video/mp4" />
        </video>
        <p class="line">
          Bienvenido... Soy IO, y manejo la base de datos de esta red...
        </p>
      </div>
      <img
        class="joystick"
        src="http://thumbs.gfycat.com/CheerfulAntiqueDassie-max-1mb.gif"
      />
      <Link to="/home">Home</Link>
    </div>
  );
}

export default App;
