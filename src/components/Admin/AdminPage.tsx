import React from "react";
import AdminNavbar from "./AdminNavbar";

export default function Page() {
  return (
    <div aria-label='admin-page-wrapper' className="bg-black min-h-screen">
      <AdminNavbar />
    </div>
  );
}