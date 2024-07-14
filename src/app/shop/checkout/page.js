"use client"

import React, { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { AiFillCreditCard, AiFillMobile } from 'react-icons/ai';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Link from 'next/link';
import { CartContext } from "../../context/CartContext.js";
import { TiShoppingCart } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import Loading from '../loading.js'; // Import your loading spinner component

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mpesaNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Clear form fields based on the selected payment method
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      mpesaNumber: '',
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic for form submission, e.g., sending data to backend
    console.log(formData); // Replace with actual form submission logic
  };

  // Fetch cart items from API
  async function fetchCart() {
    try {
      setIsLoading(true); // Set loading state to true
      const promises = cart.map(id =>
        fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-cache" }).then(res => res.json())
      );
      const items = await Promise.all(promises);
      setProducts(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  }

  // Remove item from cart
  function handleRemoveFromCart(id) {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item !== id);
      if (updatedCart.length > 0) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id)); // Update UI immediately
        fetchCart(); // Re-fetch cart data immediately after updating the cart state
      } else {
        setProducts([]); // Clear the cart display if no items are left
      }
      return updatedCart;
    });
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-3 md:px-6 px-3 ">
      <h2 className="mt-7 text-center md:text-4xl text-2xl font-bold text-center mx-auto w-5/12">Checkout</h2>
      <div className="flex items-center md:flex-row flex-col-reverse">
        {/* Checkout Form */}
        <div className="md:w-1/2 mx-auto md:p-8 py-5">
          {/* Payment Options */}
          <div className="flex justify-center space-x-4 mb-4">
            {/* Card Option */}
            <div
              className={`flex items-center p-4 rounded-lg cursor-pointer ${
                paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <AiFillCreditCard className="text-4xl" />
              <span className="ml-2">Pay with Card</span>
            </div>

            {/* Mpesa Option */}
            <div
              className={`flex items-center p-4 rounded-lg cursor-pointer ${
                paymentMethod === 'mpesa' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => handlePaymentMethodChange('mpesa')}
            >
              <AiFillMobile className="text-4xl" />
              <span className="ml-2">Pay with Mpesa</span>
            </div>
          </div>

          {/* Billing Details Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <>
                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                {/* Expiry Date */}
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="expiryDate" className="block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  {/* CVV */}
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Mpesa Number */}
            {paymentMethod === 'mpesa' && (
              <div>
                <label htmlFor="mpesaNumber" className="block mb-1">
                  Mpesa Number
                </label>
                <input
                  type="text"
                  id="mpesaNumber"
                  name="mpesaNumber"
                  value={formData.mpesaNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!products.length}
              className="text-white flex items-center justify-center space-x-2 py-5"
            >
              <span>Complete Purchase</span>
              <HiOutlineArrowRight className="text-xl" />
            </Button>
          </form>

          {/* Continue Shopping Link */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-primary underline">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
        <div className="md:w-1/2 w-full flow-root border h-[60vh] py-5 p-3 overflow-y-auto ">
            <Loading />
          </div>
           // Show loading spinner while fetching data
        ) : (
          <div className="md:w-1/2 flow-root border w-full md:h-[60vh] py-5 p-3 overflow-y-auto ">
            <ul role="list" className="-my-6 divide-y divide-gray-200 py-5 ">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="h-[20vh] px-5 flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.title} className="h-20 w-16 object-cover rounded-lg" />
                      <div>
                        <Link href={`/shop/${product.id}`}><h3 className="text-sm font-semibold hover:text-primary">{product.title}</h3></Link>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm">${product.price}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveFromCart(product.id)}
                      variant="text"
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center mt-4">Shop to Checkout</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

