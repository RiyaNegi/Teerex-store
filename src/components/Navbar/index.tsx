import "./index.css";
import { Link } from "react-router-dom";
import cart from "../../media/cart.png";

const Navbar = () => {
  return (
    <div className="nav-background">
      <div>TeeRex Store</div>
      <div>
        <span>
          <Link className="tee-link" to="/">
            Products
          </Link>
        </span>{" "}
        <span>
          {" "}
          <Link className="tee-link" to="/Cart">
            <img src={cart} style={{ width: 18 }} />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
