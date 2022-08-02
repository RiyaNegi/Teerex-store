import "./index.css";
import { Link } from "react-router-dom";
import cart from "../../media/cart.png";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";

const Navbar = () => {
  const globalStore: any = useContext(GlobalContext);

  return (
    <div className="nav-background">
      <div>TeeRex Store</div>
      <div>
        <span>
          <Link className="tee-link" to="/Teerex-store">
            Products
          </Link>
        </span>{" "}
        <span>
          {" "}
          <Link className="tee-link" to="/Cart">
            {globalStore.cartList.length > 0 && (
              <div className="cart-count ">
                {globalStore.cartList.reduce(
                  (acc: any, amt: any) => (acc += amt.quantity),
                  0
                )}
              </div>
            )}
            <img src={cart} style={{ width: 18 }} />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
