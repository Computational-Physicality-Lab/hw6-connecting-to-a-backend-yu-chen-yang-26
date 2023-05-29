import { useNavigate } from "react-router-dom";
import { useState } from "react";
import baseImage from "../../assets/images/shirt-base.png";
import "./CreateFromPicture.css";
import { createApi } from "unsplash-js";
// import tempData from "../../tempResults.json";
import { useHook } from "../../shared/hooks";
import db from "../../index.js";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";

const CreateFromPic = () => {
  const { profile, data, setData, cartNumber, setCartNumber } = useHook();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Size");
  const [selectedImg, setSelectedImg] = useState("");
  const [query, setQuery] = useState(null);
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
  const clickAdd = async () => {
    const uuid = uuidv4();
    const time = new Date();
    console.log("hi");
    await db
      .collection("users")
      .doc(profile.email)
      .update({
        cartList: firebase.firestore.FieldValue.arrayUnion(uuid),
      });
    await setDoc(doc(db, "cart", uuid), {
      name: query,
      color: "white",
      quantity: parseInt(quantity),
      size: size,
      image: selectedImg,
      price: 20.0,
      time: time.getTime(),
    });
    setCartNumber(cartNumber + 1);
    navigate("/cart");
  };
  const getData = async () => {
    const unsplash = createApi({
      accessKey: "QtqdcQJ29JjqcTCVZRBOFV4MbGvH04_UAQUR-O0cobQ",
    });
    await unsplash.search
      .getPhotos({
        query: query,
        page: 1,
        perPage: 10,
      })
      .then((result) => {
        console.log(result);
        if (result.type === "success") {
          console.log(result.response.results);
          setData(result.response.results);
        }
      });
    // setData(tempData.results);
  };
  return (
    <div className="create-body">
      <div className="create-shirt">
        <div
          className="create-shirt-pic"
          style={{ backgroundImage: `url(${baseImage})` }}
        >
          {selectedImg === "" ? (
            <></>
          ) : (
            <img
              className="create-selected-pic"
              src={selectedImg}
              alt=""
              width={300 * 0.42}
            />
          )}
        </div>
        <div className="create-shirt-info">
          <div className="create-shirt-price">$20.00</div>
          <div className="create-shirt-info-item">
            <div className="create-shirt-text">Quantity:</div>
            <select
              className="create-quantity"
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
          <div className="create-shirt-info-item">
            <div className="create-shirt-text">Size:</div>
            <select
              className="create-size"
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
              (profile.length !== 0) & (size !== "Size") & (selectedImg !== "")
                ? "add-button"
                : "not-add-button"
            }
            onClick={() => clickAdd()}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="search-pic">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={() => getData()}>
            Search
          </button>
        </div>
        {data.length === 0 ? (
          <h2>No Results</h2>
        ) : (
          <div className="search-result">
            {data.map((item) => (
              <img
                key={item.links.download}
                className="search-result-item"
                src={item.links.download}
                width={300 * 0.42}
                alt=""
                onClick={() => setSelectedImg(item.links.download)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateFromPic;
