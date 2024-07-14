
"use client"

import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { SiCarthrottle } from "react-icons/si";
import { TiShoppingCart } from "react-icons/ti";
import { RiMenu2Fill, RiAccountCircleFill, RiGalleryView2, RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { CartContext } from "../context/CartContext.js";
import CartDrawer from "./CartDrawer.jsx";

export default function Navbar({ home, all, clothes, getStarted, shop }) {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setCount(cart?.length);
  }, [cart]);

  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background md:ps-12 px-4 md:px-6 z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold md:text-base">
          <SiCarthrottle className="text-3xl" />
          <span className="sr-only">Bizna</span>
        </Link>
        {home && (
          <Link href="/" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
        )}
        {all && (
          <Link href="#" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            All
          </Link>
        )}
        {clothes && (
          <Link href="#" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Clothes
          </Link>
        )}
        {shop && (
          <Link href="/shop" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <RiMenu2Fill className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold md:text-base">
          <SiCarthrottle className="text-3xl" />
          <span className="sr-only">Bizna</span>
        </Link>
        {home && (
          <Link href="/" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
        )}
          {clothes && (
          <Link href="#" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Clothes
          </Link>
        )}
        {shop && (
          <Link href="/shop" className="text-base text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
        )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-2 md:ml-auto md:gap-2 lg:gap-4">
        {getStarted ? (
          <div className="ms-auto flex-1 md:flex-initial flex md:space-x-3 space-x-1">
            <Link href="/login">
              <Button size={"lg"} variant={"outline"}>Log In</Button>
            </Link>
            <Link href="/register">
              <Button size={"lg"}>Sign Up</Button>
            </Link>
            <span className="h-full text-2xl p-2 border rounded-full focus:border-primary cursor-pointer">
              {isDark ? (
                <IoMdMoon onClick={() => setIsDark(!isDark)} />
              ) : (
                <IoMdSunny onClick={() => setIsDark(!isDark)} />
              )}
            </span>
          </div>
        ) : (
          <>
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <RiSearch2Line className="absolute left-2.5 top-2.5 h-5 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] text-[0.9rem] py-5"
                />
              </div>
            </form>
            <span className="h-full text-2xl p-2 border rounded-full focus:border-primary cursor-pointer">
              {isDark ? (
                <IoMdMoon onClick={() => setIsDark(!isDark)} />
              ) : (
                <IoMdSunny onClick={() => setIsDark(!isDark)} />
              )}
            </span>
            <button
              onClick={() => setDrawerOpen(true)}
              className="focus:border-primary cursor-pointer rounded-full border relative p-2"
            >
              <TiShoppingCart className="text-[1.5rem]" />
              <span className="bg-primary text-md text-white top-[-15px] right-[-10px] absolute rounded-full px-2 py-[0.1rem] flex items-center justify-center max-w-7">
                {count}
              </span>
            </button>
            <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" size="icon" className="rounded-full">
                  <RiAccountCircleFill className="h-10 w-10" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}

