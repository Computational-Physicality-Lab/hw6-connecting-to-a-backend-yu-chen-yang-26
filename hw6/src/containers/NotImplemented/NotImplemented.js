import not_implemented from "../../assets/images/scotty.png";
import "./NotImplemented.css";
const NotImplemented = () => {
  return (
    <div className="not_implemented-body">
      <img className="not_implemented-pic" alt="" src={not_implemented} />
      <div className="not_implemented-text">
        Oops, this page doesn't exist yet... how about a shirt from the last
        page?
      </div>
    </div>
  );
};
export default NotImplemented;
