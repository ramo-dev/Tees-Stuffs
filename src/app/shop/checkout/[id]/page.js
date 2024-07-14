"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AiFillCreditCard, AiFillMobile } from 'react-icons/ai';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Link from 'next/link';
import { TiShoppingCart } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import Loading from '../../loading.js'; // Import your loading spinner component

export function Page({ params }){
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mpesaNumber: '',
  });

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
    console.log(formData); // Placeholder for actual form submission logic
  };

  // Fetch product from API
  useEffect(() => {
    async function fetchProduct(id){
      try {
        console.log(id);
        const resp = await fetch(`https://fakestoreapi.com/products/${id.id}`);
        const data = await resp.json();
        setProducts([data]);
        setLoading(false); // set loading to false after data is fetched
      } catch(err) {
        console.log(err);
        setLoading(false); // set loading to false in case of error
      }
    }
    fetchProduct(params);
  }, [params]);

  return (
    <div className="p-3 md:px-6 px-3">
      <h2 className="mt-7 text-center md:text-4xl text-2xl font-bold mx-auto w-5/12">Checkout</h2>
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
              <label htmlFor="name" className="block mb-1">Name</label>
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
              <label htmlFor="email" className="block mb-1">Email</label>
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
              <label htmlFor="address" className="block mb-1">Address</label>
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
                  <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
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

                {/* Expiry Date and CVV */}
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="expiryDate" className="block mb-1">Expiry Date</label>
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
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block mb-1">CVV</label>
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
                <label htmlFor="mpesaNumber" className="block mb-1">Mpesa Number</label>
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
            <Link href="/shop" className="text-primary underline">Continue Shopping</Link>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="md:w-1/2 w-full flow-root border h-[60vh] py-5 p-3 overflow-hidden">
            <Loading />
          </div>
        ) : (
          <div className="md:w-1/2 flow-root border w-full md:h-max py-5 p-3 overflow-y-auto">
            <div  className="-my-6 divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="max-w-5xl mx-auto md:p-6 p-5 rounded-lg lg:flex lg:items-center lg:space-x-6">
        <img src={product.image}
          alt={product.title}
          className="w-full max-w-lg mx-auto rounded-md lg:w-1/3"
        />
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center space-y-4 justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold mb-2">${product.price} <i className="text-gray-400 text-sm ms-1">was - <s>{"$"}{Math.floor(product.price * 1.1)}</s></i></p>
          <p>{product.description}</p>
          <div className="my-2 space-x-3 mt-auto w-full flex">    
            
          </div>
        </div>
      </div>
                ))
              ) : (
                <p className="text-center mt-4">Shop to Checkout</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

