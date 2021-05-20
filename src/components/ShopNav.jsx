import axios from "axios";
import { Link } from "react-router-dom";

const ShopNav = ({ username, history }) => {
  const handleLogout = (e) => {
    console.log("clicked");
    axios.defaults.withCredentials = true;
    axios
      .delete(
        "http://localhost:8081/GameDeal/login",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        const { message } = response.data;
        if (message === "session was invalidated") {
          localStorage.removeItem("userId");
          history.push("/login");
        }
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/deals">
          GameDeals
        </Link>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start mr-5 text-center">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/deals" tabIndex="-1">
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games" tabIndex="-1">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" tabIndex="-1">
                {username}
              </Link>
            </li>

            <li className="nav-item">
              <div className="btn btn-warning" onClick={handleLogout}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ShopNav;
