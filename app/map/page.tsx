"use client";

// import React, { useState, useEffect } from "react";
import MapComponent from "../AppComponents/MapComponent";
import "leaflet/dist/leaflet.css";
// import { ThemeProvider } from "@/components/theme-provider";

const Page = () => {
  return (
    <div className="h-screen">
      <MapComponent />
    </div>
  );
};

export default Page;
