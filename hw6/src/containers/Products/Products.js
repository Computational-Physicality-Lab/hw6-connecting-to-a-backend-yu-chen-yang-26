import { useNavigate } from "react-router-dom";
import shirts from "../../shared/shirts";
import defaultImage from "../../assets/shirt_images/not-found.png";
import "./Products.css";
const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="product-body">
      <div className="product-title">Our T-Shirts</div>
      <div className="product-items">
        {shirts.map((item) => {
          return (
            <div className="product-item" key={item.name}>
              <img
                className="product-item-pic"
                alt=""
                src={item.colors[Object.keys(item.colors)[0]].front}
                onClick={() => navigate("/detail/" + item.name)}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <div className="product-item-name">{item.name}</div>
              <div className="product-item-status">
                Available in {Object.keys(item.colors).length} colors
              </div>
              <div className="product-item-button">
                <button
                  className="product-item-see-page"
                  onClick={() => navigate("/detail/" + item.name)}
                >
                  See Page
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Products;
