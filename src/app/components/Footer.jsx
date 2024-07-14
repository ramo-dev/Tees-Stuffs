
// components/Footer.jsx

import React from 'react';
import { Button } from "@/components/ui/button";
import { SiCarthrottle } from "react-icons/si";


function Footer(){
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Logo */}
        <SiCarthrottle className="text-4xl"/>
        {/* Subscribe to Newsletter */}
        <h1 className="py-3 text-lg">Subscribe to our newsletter</h1>

        <form className="max-w-2xl flex items-center justify-center mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="md:w-full w-2/3 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-primary"
          />
          <Button
            
            className="px-4 py-[1.29rem] text-white rounded-l-none"
          >
            Subscribe
          </Button>
        </form>

        {/* Copyright */}
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Bizna. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

