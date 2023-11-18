"use client"

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { usePathname} from 'next/navigation';
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

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
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link color={`${pathname === "/dashboard" ? "primary" : "foreground"}`} href="/dashboard">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/dashboard/students"}>
          <Link color={`${pathname === "/dashboard/students" ? "primary" : "foreground"}`} href="/dashboard/students">
            Students
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/dashboard/transactions"}>
          <Link color={`${pathname === "/dashboard/transactions" ? "primary" : "foreground"}`} href="/dashboard/transactions">
            Transactions
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <LoginLink>
              <Button color="default" variant="light">
                Sign In
              </Button>
            </LoginLink>
          </NavbarItem>
          <NavbarItem>
            <RegisterLink >
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </RegisterLink>
          </NavbarItem>
        </NavbarContent>
    </Navbar>
  );
}
