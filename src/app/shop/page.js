

"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, Suspense, useContext } from "react";
import Loading from "./loading";
import Collection from "./Collection";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { TiShoppingCart } from "react-icons/ti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartContext } from "../context/CartContext.js";

export default function Page({ children }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Start with loading set to true

  const router = useRouter();

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const fetchProducts = async (category) => {
    setLoading(true); // Set loading to true when fetching data starts
    try {
      const url = category ? `https://fakestoreapi.com/products/category/${category}` : `https://fakestoreapi.com/products`;
      const data = await fetch(url);
      const resp = await data.json();
      setProducts(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when data fetching completes
    }
  };

  function handleRedirectToView(productId) {
    router.push(`/shop/${productId}`);
  };

  function handleAddToCart(id) {
    const itm = cart.find(itm => itm === id);
    if (itm == id) {
      setCart(cart.filter(itms => itms !== id));
    } else {
      setCart(prev => [...prev, id]);
    }
  }


  function handleView(id){
    router.push(`/shop/${id}`)
  }


  // Render the component
  return (
    <>
      <Collection />
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Customers also purchased</h2>
          <div className="mt-5">
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Products</SelectItem>
                <SelectItem value="men's clothing">Men's Clothing</SelectItem>
                <SelectItem value="women's clothing">Women's Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelery">Jewelery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Suspense fallback={<Loading />}>
            {loading || products.length === 0 ? ( // Display loading if still loading or products are empty
              <Loading />
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                          <h3 className="text-sm"> {product.title} </h3>
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-sm font-medium">${product.price}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <Button className="w-full" className="flex-1" onClick={()=>handleView(product.id)}>View</Button>
                          
                        <Button className="w-3/12 text-3xl" variant={`${cart.find(item => item === product.id) ? "" : "outline"}`} onClick={() => handleAddToCart(product.id)}>
                        <TiShoppingCart />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
}

