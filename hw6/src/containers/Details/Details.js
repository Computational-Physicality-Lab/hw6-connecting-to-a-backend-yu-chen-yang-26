import { useNavigate, useParams } from "react-router-dom";
import shirts from "../../shared/shirts";
import "./Details.css";
import { useEffect, useState } from "react";
import defaultImage from "../../assets/shirt_images/not-found.png";
import { useHook } from "../../shared/hooks";
import db from "../../index.js";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";

const Details = () => {
  const { profile, setCartNumber, cartNumber } = useHook();
  const navigate = useNavigate();
  const { name } = useParams();
  const realName = name.replaceAll("%20", " ");
  const item = shirts.find((x) => x.name === realName);
  const colors = Object.keys(item.colors);
  const [color, setColor] = useState(colors[0]);
  const [side, setSide] = useState("front");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Size");
  const numberArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const sizeArray = [
    "Size",
    "Women's XS",
    "Women's S",
    "Women's M",
    "Women's L",
    "Women's XL",
    "Women's 2XL",
    "Men's XS",
    "Men's S",
    "Men's M",
    "Men's L",
    "Men's XL",
    "Men's 2XL",
  ];
  const clickSide = (mode) => {
    setSide(mode);
  };
  const clickColor = (color) => {
    setColor(color);
  };
  const clickAdd = async () => {
    const uuid = uuidv4();
    const time = new Date();
    await db
      .collection("users")
      .doc(profile.email)
      .update({
        cartList: firebase.firestore.FieldValue.arrayUnion(uuid),
      });
    await setDoc(doc(db, "cart", uuid), {
      name: realName,
      color: color,
      quantity: parseInt(quantity),
      size: size,
      image: item.colors[color]["front"],
      price: parseFloat(item.price.replace("$", "")),
      time: time.getTime(),
    });
    setCartNumber(cartNumber + 1);
    navigate("/cart");
  };
  useEffect(() => {
    if (item !== undefined) {
      const img = document.getElementsByClassName("detail-shirt-pic")[0];
      img.src = item.colors[color][side];
    }
  }, [item, color, side]);
  return (
    <div className="detail-body">
      <div className="detail-header">{item.name}</div>
      <div className="detail-shirt">
        <img
          className="detail-shirt-pic"
          alt=""
          src={item.colors[Object.keys(item.colors)[0]].front}
          onError={(e) => (e.target.src = defaultImage)}
        />
        <div className="detail-shirt-info">
          <div className="detail-shirt-price">
            {item.price ? item.price : "Please contact us to get the price."}
          </div>
          <div className="detail-shirt-description">{item.description}</div>
          <div className="detail-shirt-info-item">
            <div className="detail-shirt-text">Side:</div>
            <button
              className="detail-shirt-front-button"
              onClick={() => clickSide("front")}
            >
              Front
            </button>
            <button
              className="detail-shirt-back-button"
              onClick={() => clickSide("back")}
            >
              Back
            </button>
          </div>
          <div className="detail-shirt-info-item">
            <div className="detail-shirt-text">Color:</div>
            {colors.map((color) => (
              <div
                className="detail-shirt-color-button"
                style={{ backgroundColor: color }}
                key={color}
                onClick={() => clickColor(color)}
              >
                {color}
              </div>
            ))}
          </div>
          <div className="detail-shirt-info-item">
            <div className="detail-shirt-text">Quantity:</div>
            <select
              className="detail-quantity"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {numberArray.map((i) => {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="detail-shirt-info-item">
            <div className="detail-shirt-text">Size:</div>
            <select
              className="detail-size"
              onChange={(e) => setSize(e.target.value)}
            >
              {sizeArray.map((i) => {
                if (i === "Size:") {
                  <option value="" key={i}>
                    {i}
                  </option>;
                }
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            className={
              (profile.length !== 0) &
              (size !== "Size") &
              (item.price !== undefined)
                ? "add-button"
                : "not-add-button"
            }
            onClick={() => clickAdd()}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Details;
