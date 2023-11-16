"use client"

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { usePathname} from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname()
  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        
        <p className="font-bold text-inherit">ePLE-T</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/admin"}>
          <Link color={`${pathname === "/admin" ? "primary" : "foreground"}`} href="/admin">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/students"}>
          <Link color={`${pathname === "/admin/students" ? "primary" : "foreground"}`} href="/admin/students">
            Students
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/transactions"}>
          <Link color={`${pathname === "/admin/transactions" ? "primary" : "foreground"}`} href="/admin/transactions">
            Transactions
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
