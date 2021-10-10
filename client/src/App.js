import "./App.css";
import { Link } from "react-router-dom";
import rash from "./video/rash.mp4";

function App() {
  return (
    <div className="App">
      <Link to="/home">
        <div class="video-container">
          <video class="face" loop autoPlay muted>
            <source src={rash} type="video/mp4" />
          </video>
        </div>
      </Link>

      <div class="text-container">
        <p class="line">Welcome... I am IO, and I manage the database...</p>
      </div>
    </div>
  );
}

export default App;
