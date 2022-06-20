import React from "react";
import { Marker, useMap } from "react-leaflet";

function NewMarker({ center }) {
  const map = useMap();
  if (center) {
    map.flyTo(center, 13);
  }
  return (
    <div>
      <Marker position={center}></Marker>
    </div>
  );
}

export default NewMarker;
