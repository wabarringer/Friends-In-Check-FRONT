import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Home/style.css';
import chessboardHome from "../../../img/chessboard-home.png";

const Home = ({ roomId, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section>
      <div className="column">
        <div className="box">
          <Link to={`/room/${roomId}`}>
            <img src={chessboardHome} alt="chessboard with pawn" />
            <button>Host a Room</button>
          </Link>
        </div>

        <div className="box">
          <img src={chessboardHome} alt="chessboard with a pawn"/>
          <button>JOIN A ROOM</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
