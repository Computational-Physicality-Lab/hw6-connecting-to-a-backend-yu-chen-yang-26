import { useNavigate } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer-banner">
        <div
          className="footer-banner-item"
          onClick={() => navigate("/not_implemented")}
        >
          Contact Us
        </div>
        <div
          className="footer-banner-item"
          onClick={() => navigate("/not_implemented")}
        >
          Site Map
        </div>
        <div
          className="footer-banner-item"
          onClick={() => navigate("/not_implemented")}
        >
          Privacy Policy
        </div>
        <div
          className="footer-banner-item"
          onClick={() => navigate("/not_implemented")}
        >
          Careers
        </div>
        <div
          className="footer-banner-item"
          onClick={() => navigate("/not_implemented")}
        >
          Reviews
        </div>
        <div className="footer-banner-sign">Designed by Yang, Yu-Chen</div>
      </div>
    </footer>
  );
};
export default Footer;
