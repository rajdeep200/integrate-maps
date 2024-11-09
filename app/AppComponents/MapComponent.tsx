import React, { useEffect, useRef, useState } from "react";
import { TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationMarker from "./LocationMarker";
import { Input } from "@/components/ui/input";
import { getLocationList } from "@/services/locationService";
import locationIconPng from "../../assets/location.png";
import outLocationIconPng from "../../assets/outLocation.png";

const MapComponent = () => {
  const [location, setLocation] = useState([22.5744, 88.3629]);
  const [debounceTime, setDebounceTime] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [locationIcon, setLocationIcon] = useState(locationIconPng);
  const [locationList, setLocationList] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const debounceRef = useRef(null);
  const zoom = 13;

  useEffect(() => {
    console.log("Location changed...");
  }, [location]);

  const handleBtnClick = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        // setLocationIcon(locationIconPng);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000,
      }
    );
  };

  const fetchLocation = async (searchInput: string) => {
    if (searchInput.length > 2) {
      const { success, list } = await getLocationList(searchInput);
      if (success) {
        setLocationList(list);
      }
    }
  };

  const handleSearchChange = (e) => {
    console.log("search change");
    const searchValue = e.target.value;
    setUserInput(searchValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchLocation(searchValue);
    }, 500);
  };

  console.log("locationList :: ", locationList);

  const handleSearchLocation = (location) => {
    console.log("handleSearchLocation location :: ", location);
    setLocation([location.lat, location.lon]);
    // setLocationIcon(outLocationIconPng);
    setLocationList([]);
    setUserInput(location.display_name);
  };

  return (
    <div className="h-screen">
      <Card className="h-[90%] p-4 m-2 flex flex-col items-center" key={1}>
        <Input
          type="email"
          placeholder="Enter location..."
          className="w-full py-6 mb-6"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) => handleSearchChange(e)}
        />
        <div
          className="absolute w-full bg-white border rounded-md shadow-lg p-2 mt-14 w-[83%] cursor-pointer"
          style={{ zIndex: 100 }}
        >
          {locationList.map((locationObj) => (
            <>
              <p
                key={locationObj.place_id}
                className="truncate py-2 px-2"
                onClick={() => handleSearchLocation(locationObj)}
              >
                {locationObj.display_name}
              </p>
              <hr />
            </>
          ))}
        </div>

        <MapContainer
          center={location}
          zoom={zoom}
          className="h-[100%] w-[100%] rounded-md z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker location={location} icon={locationIcon} />
        </MapContainer>
        <Button
          className="text-lg px-12 py-6 mt-4 font-bold"
          onClick={handleBtnClick}
        >
          Find My Location
        </Button>
      </Card>
    </div>
  );
};

export default MapComponent;
