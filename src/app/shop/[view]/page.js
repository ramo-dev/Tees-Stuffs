

"use client"

// pages/shop/[id].js
import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import Image from "next/image";
import Loading from "../loading.js";
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button";
import { CartContext } from "../../context/CartContext.js";
import { TiShoppingCart } from "react-icons/ti";

export default function Product({ params }) {
  const [product, setProduct] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter(); 


  const fetchProducts = async () => {
    try {
      const url = "https://fakestoreapi.com/products/";
      const data = await fetch(url);
      const resp = await data.json();
      setProducts(resp);
      setLoading(false); // set loading to false after data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // set loading to false in case of error
    }
  };

  useEffect(() => {
    const productId = cart.find(itm => itm === params);
    setIsInCart(productId);
    fetchProducts(); 
  }, []);

  function handleAddToCart(id){
    const itm = cart.find(itm => itm === id);
    if(itm == id){
      setCart(cart.filter(itms => itms !== id));
    } else {
      setCart(prev => [...prev, id]);
    }
  }

  useEffect(() => {
    async function fetchProduct(id){
      try {
        console.log(id);
        const resp = await fetch(`https://fakestoreapi.com/products/${id.view}`);
        const data = await resp.json();
        console.log(data);
        setProduct(data);
        setLoading(false); // set loading to false after data is fetched
      } catch(err) {
        console.log(err);
        setLoading(false); // set loading to false in case of error
      }
    }
    fetchProduct(params);
  }, []);

  if (loading) {
    return <Loading />;
  };


  function handleBuyNow(id){

    router.push(`/shop/checkout/${id}`)
  }

    function handleView(id){
    router.push(`/shop/${id}`)
  }



  return (
    <>
      <div className="border mt-14 mb-20 max-w-5xl mx-auto md:p-6 p-5 rounded-lg lg:flex lg:items-center lg:space-x-6">
        <Image
          height="300"
          width="200"
          src={product.image}
          alt={product.title}
          className="w-full max-w-lg mx-auto rounded-md lg:w-1/3"
        />
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center space-y-4 justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold mb-2">${product.price} <i className="text-gray-400 text-sm ms-1">was - <s>{"$"}{Math.floor(product.price * 1.1)}</s></i></p>
          <p>{product.description}</p>
          <div className="my-2 space-x-3 mt-auto w-full flex">
            <Button className="w-full" onClick={()=>handleBuyNow(product.id)}>Buy Now</Button>     
            <Button className="md:min-w-40" variant={`${cart.find(item => item === product.id) ? "" : "outline"}`} onClick={() => handleAddToCart(product.id)}>
              {`${cart.find(item => item === product.id) ? "Remove from Cart" : "Add To cart"}`}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full h-1 border-t border mx-auto px-3"></div>
      <h1 className="font-bold md:text-3xl text-2xl mt-5 md:mx-8 ms-4">Customer also bought</h1>
      <div className="mx-auto px-4 sm:pb-14 lg:max-w-7xl lg:px-9 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="border shadow-sm p-3 rounded-lg group relative flex flex-col">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Link href={`/shop/${product.id}`}>
                <span aria-hidden="true" />                                  
                <Image
                  src={product.image}
                  width="300"
                  height="300"
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </Link>
            </div>
            <div className="mt-4 flex justify-between flex-1">
              <div>
                <Link className="hover:text-primary" href={`/shop/${product.id}`}>
                  <h3 className="text-sm">{product.title}</h3>
                </Link>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-medium">${product.price}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              
                  <Button className="w-full" onClick={()=> handleView(product.id)}>View</Button>
             
              <Button className="w-3/12 text-3xl" variant={`${cart.find(item => item === product.id) ? "" : "outline"}`} onClick={() => handleAddToCart(product.id)}>
                <TiShoppingCart />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

