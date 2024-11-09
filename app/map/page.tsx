'use client';

import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import("../AppComponents/MapComponent"), {
  ssr: false, 
});
import "leaflet/dist/leaflet.css";

const Page = () => {
  return (
    <div className="h-screen">
      <MapComponent />
    </div>
  );
};

export default Page;
