// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Flag from "./Flag";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
// import { map } from "leaflet";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([28.613939, 77.209023]);
  const [searchParams] = useSearchParams();
  console.log();
  console.log();

  const {
    isLoading: isLoadingPostion,
    position: geolocationPostion,
    getPosition,
  } = useGeolocation();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  // console.log(geolocationPostion);
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPostion)
        setMapPosition([geolocationPostion.lat, geolocationPostion.lng]);
    },
    [geolocationPostion]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPostion && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPostion ? "Loading..." : "Use your postion "}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {" "}
                <Flag flag={city.emoji} />
              </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
