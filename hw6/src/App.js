import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import NotImplemented from "./containers/NotImplemented/NotImplemented";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Products from "./containers/Products/Products";
import Details from "./containers/Details/Details";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import Login from "./containers/Login/Login";
import CreateFromPic from "./containers/CreateFormPicture/CreateFromPicture";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/not_implemented" element={<NotImplemented />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create_from_pic" element={<CreateFromPic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:name" element={<Details />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
