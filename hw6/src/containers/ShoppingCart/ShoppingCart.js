import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";
import { useEffect, useState } from "react";
import defaultImage from "../../assets/shirt_images/not-found.png";
import { useHook } from "../../shared/hooks";
import db from "../../index.js";
import baseImage from "../../assets/images/shirt-base.png";
import { doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

const ShoppingCart = () => {
  const { profile, cartNumber, setCartNumber } = useHook();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();
  const numberArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const clickRemove = async (id) => {
    await deleteDoc(doc(db, "cart", id));
    await db
      .collection("users")
      .doc(profile.email)
      .update({
        cartList: firebase.firestore.FieldValue.arrayRemove(id),
      });
    setCart(cart.filter((item) => item.id !== id));
    setCartNumber(cartNumber - 1);
  };
  const changeQuantity = async (id, quantity) => {
    const item = cart.filter((item) => item.id === id);
    const index = cart.indexOf(item[0]);
    let tempCart = [...cart];
    tempCart[index].quantity = parseInt(quantity);
    await db
      .collection("cart")
      .doc(id)
      .update({
        quantity: parseInt(quantity),
      });
    setCart(tempCart);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("hi");
      if (profile.length !== 0) {
        let itemData;
        await db
          .collection("users")
          .doc(profile.email)
          .get()
          .then(async (querySnapshot) => {
            itemData = querySnapshot.data();
          });
        let tempList = [];
        console.log(itemData.cartList);
        await itemData.cartList.map(async (item) => {
          await db
            .collection("cart")
            .doc(item)
            .get()
            .then((querySnapshot) => {
              tempList.push({
                id: querySnapshot.id,
                ...querySnapshot.data(),
              });
              setCart(tempList);
            });
        });
      }
    };
    fetchData();
  }, [profile, setCart]);
  useEffect(() => {
    var total = 0;
    var number = 0;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      total = total + element.price * element.quantity;
      number = number + element.quantity;
    }
    setSubtotal(total);
    setNumber(number);
  }, [cart]);
  return (
    <div className="cart">
      <div className="cart-header">
        {cart.length === 0 ? "Your Cart is Empty" : "My Cart (" + number + ")"}
      </div>
      <div className="cart-body">
        <div className="cart-content">
          {cart.length === 0 ? (
            <></>
          ) : (
            cart
              .sort((a, b) => (a.time < b.time ? 1 : a.time > b.time ? -1 : 0))
              .map((item) => {
                return (
                  <div className="cart-details" key={item.id}>
                    <div className="cart-shirt-name">{item.name}</div>
                    <div className="cart-shirt">
                      {item.image.startsWith("http") ? (
                        <div
                          className="cart-created-shirt-pic"
                          style={{ backgroundImage: `url(${baseImage})` }}
                        >
                          <img
                            className="cart-selected-pic"
                            src={item.image}
                            alt=""
                            width={300 * 0.42}
                          />
                        </div>
                      ) : (
                        <img
                          className="cart-shirt-pic"
                          alt=""
                          src={item.image}
                          onError={(e) => (e.target.src = defaultImage)}
                        />
                      )}
                      <div className="cart-shirt-info">
                        <div className="cart-shirt-info-item">
                          <div className="cart-shirt-rowname">Quantity: </div>
                          <select
                            className="cart-shirt-quantity"
                            defaultValue={item.quantity}
                            onChange={(e) =>
                              changeQuantity(item.id, e.target.value)
                            }
                          >
                            {numberArray.map((i) => {
                              return (
                                <option value={i} key={i}>
                                  {i}
                                </option>
                              );
                            })}
                          </select>
                          {/* <div className="cart-shirt-text">{item.quantity}</div> */}
                        </div>
                        <div className="cart-shirt-info-item">
                          <div className="cart-shirt-rowname">Color: </div>
                          <div className="cart-shirt-text">{item.color}</div>
                        </div>
                        <div className="cart-shirt-info-item">
                          <div className="cart-shirt-rowname">Size: </div>
                          <div className="cart-shirt-text">{item.size}</div>
                        </div>
                        <div className="cart-shirt-info-item">
                          <div className="cart-shirt-rowname">Price: </div>
                          <div className="cart-shirt-text">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <button
                          className="remove"
                          onClick={() => clickRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
        <div className="cart-info">
          <div className="cart-order">
            <div className="cart-order-header">Order Summary</div>
            <div className="cart-order-item">
              <div className="cart-order-rowname">Subtotal: </div>
              <div className="cart-order-text">${subtotal.toFixed(2)}</div>
            </div>
            <div className="cart-order-item">
              <div className="cart-order-rowname">Est. Shipping: </div>
              <div className="cart-order-text">$6.95</div>
            </div>
            <div className="cart-order-item">
              <div className="cart-order-rowname">Total: </div>
              <div className="cart-order-text">
                ${(subtotal + 6.95).toFixed(2)}
              </div>
            </div>
            <div className="button-container">
              {cart.length === 0 ? (
                <button
                  className="checkout"
                  style={{ opacity: "40%", pointerEvents: "none" }}
                >
                  Sign in and Checkout
                </button>
              ) : (
                <button
                  className="checkout"
                  onClick={() => navigate("/not_implemented")}
                >
                  Sign in and Checkout
                </button>
              )}
            </div>
          </div>
          <div className="button-container">
            <button className="continue" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
