"use client"
import React, { useState} from "react";
import Navbar from "../components/Navbar";
import GoBackBtn from "../components/GoBackBtn"
import Footer from "../components/Footer";
import {CartContext} from "../context/CartContext"

export default function Layout({children}){
  const [cart, setCart] = useState([]);
  return (
    <>
      <CartContext.Provider value={{cart, setCart}}>
       <Navbar home="home" shop="shop" />
           <GoBackBtn/>
            {children}
       <Footer/>
      </CartContext.Provider>
    </>
  )
}
