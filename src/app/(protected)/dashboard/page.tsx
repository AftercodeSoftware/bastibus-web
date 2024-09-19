"use client";
import React from "react";

export default function Dashboard() {
  async function logOut() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    console.log(response);
  }

  return (
    <div>
      <h1 className="text-4xl text-verde-600">Dashboard</h1>
      <button onClick={logOut} className="text-blue-200">
        LOGOUT
      </button>
    </div>
  );
}
