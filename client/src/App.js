import { Link } from "react-router-dom";
import "./pagestyle.css";

export default function App() {
  return (
    <div class="center content" id="homebox">
      <h1 id="welcome">Welcome to Set</h1>
      <img
        src="https://www.playmonster.com/wp-content/uploads/2020/04/SET_FamilyGames_digital.png"
        alt="Game of Set Logo"
        id="homeimage"
      />
      <br />
      <button type="button" class="btn btn-danger" id="homebutton">
        <Link class="nav-link" to="/Game">
          Play Now
        </Link>
      </button>
    </div>
  );
}
