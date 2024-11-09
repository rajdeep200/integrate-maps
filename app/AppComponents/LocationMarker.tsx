import { Icon } from "leaflet";
import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import locationIconPng from "../../assets/location.png";

const LocationMarker = (props) => {
//   console.log("props.location :: ", props.location);
  const map = useMap();
  map.flyTo([props.location[0], props.location[1]], 13);

  return (
    <Marker
      position={props.location}
      icon={
        new Icon({
          iconUrl: locationIconPng.src,
          iconSize: [50, 50],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
