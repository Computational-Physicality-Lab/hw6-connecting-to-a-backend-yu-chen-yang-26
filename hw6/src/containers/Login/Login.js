import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleIcon from "../../assets/images/google-logo.png";
import "./Login.css";
import { useHook } from "../../shared/hooks";
import db from "../../index.js";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const { profile, setProfile, setCartNumber, setData } = useHook();
  const [user, setUser] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user.length !== 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [setProfile, user]);

  useEffect(() => {
    const getUserData = async () => {
      let userData;
      await db
        .collection("users")
        .get()
        .then(async (querySnapshot) => {
          userData = querySnapshot.docs
            .filter((doc) => doc.id === profile.email)
            .map((doc) => doc.data());
        })
        .catch((e) => console.log(e));
      if (userData.length === 0) {
        await setDoc(doc(db, "users", profile.email), {
          cartList: [],
        });
        setCartNumber(0);
      } else {
        setCartNumber(userData[0].cartList.length);
      }
    };
    if (profile.length !== 0) {
      console.log("hi");
      getUserData();
    }
  }, [profile, setCartNumber]);
  const logOut = () => {
    googleLogout();
    setProfile([]);
    setCartNumber(0);
    setData([]);
  };
  return (
    <div className="login">
      {profile.length !== 0 ? (
        <div className="profile">
          <div className="profile-circle">
            <img className="profile-picture" src={profile.picture} alt="" />
          </div>

          <div className="profile-detail">
            <div>Name: {profile.name}</div>
            <div>Email: {profile.email}</div>
            <button className="logout-button" onClick={() => logOut()}>
              Log out as {profile.name}
            </button>
          </div>
        </div>
      ) : (
        <button className="login-button" onClick={() => login()}>
          <img src={googleIcon} height={"30px"} alt="" />
          <p>Sign in with Google</p>
        </button>
      )}
    </div>
  );
};
export default Login;
