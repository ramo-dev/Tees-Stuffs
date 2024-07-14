
"use client"


import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { TiShoppingCart } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext.js";
import {useRouter} from "next/navigation"


export default function CartDrawer({ open, onClose }) {
  const { cart, setCart } = useContext(CartContext);
  const [yourTotals, setYourTotals] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (cart.length > 0) {
      fetchCart();
    } else {
      setYourTotals([]);
      setTotalPrice(0); 
    }
  }, [cart]);

  useEffect(() => {
    if (yourTotals.length > 0) {
      getTotal();
    }
  }, [yourTotals]);

  async function fetchCart() {
    try {
      const promises = cart.map(id =>
        fetch(`https://fakestoreapi.com/products/${id}`, { next: "no-cache" }).then(res => res.json())
      );
      const items = await Promise.all(promises);
      setYourTotals(items);
    } catch (err) {
      console.error(err);
    }
  }

  function getTotal() {
    const prices = yourTotals.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(prices);
  }

  function handleRemoveFromCart(id) {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item !== id);
      if (updatedCart.length > 0) {
        fetchCart(); // Re-fetch cart data immediately after updating the cart state
      } else {
        setYourTotals([]); // Clear the cart display if no items are left
      }
      return updatedCart;
    });
  }

  function handleCheckout() {
    router.push("/shop/checkout")
     }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cart Details</SheetTitle>
          <SheetDescription>
            Review items in your cart. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {yourTotals.map(product => (
            <div key={product.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="h-16 w-16 object-cover rounded-lg" />
                <div>
                  <Link href={`/shop/${product.id}`}><h3 className="text-sm font-semibold hover:text-primary">{product.title}</h3></Link>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-sm">${product.price}</p>
                </div>
              </div>
              <Button
                onClick={() => handleRemoveFromCart(product.id)}
                variant="text"
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>
        <div className="w-full flex bg-primary/20 my-3 p-2 rounded-md items-center justify-between">
          <h2 className="text-xl font-bold">Total: </h2><span className="text-lg">${totalPrice.toFixed(2)}</span>
        </div>
        <SheetFooter>
          <Button disabled={!cart.length} onClick={handleCheckout} className="w-full mt-auto text-xl">Checkout <TiShoppingCart className="ml-2 text-xl" /> </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

