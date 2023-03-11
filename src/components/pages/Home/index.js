import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

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
            <button>Host a Room</button>
          </Link>
        </div>

        <div className="box">
          <button>Join a Room</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
